import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import { Row, Col }  from 'react-bootstrap';
import axios from 'axios';
import SkillForm from './SkillsModal'
import DeleteSkillModal from './DeleteSkillModal'

var Select = require('react-select');
var api = (process.env.REACT_APP_API);

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      modalIsOpen: false,
      deleteModalIsOpen: false,
      currentSkill: {
        skill_id: "",
        name: "",
        skill_type: "",
        links: [],
      }
    };

    this.openModal = this.openModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.afterDeleteModal = this.afterDeleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
  openDeleteModal(){
    this.setState({deleteModalIsOpen: true});
  }
  afterOpenModal() {
  }
  afterDeleteModal() {
    //STUB
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  closeDeleteModal() {
    this.setState({deleteModalIsOpen: false});
  }

  onChange(key, value) {
    axios.get(api + '/skills/' + value)
      .then(res => {
        const skillresults = res.data
        console.log(value)
        console.log(skillresults)
        this.setState(
          {currentSkill: {
            skill_id: skillresults.id,
            name: skillresults.name,
            skill_type: skillresults.skill_type,
            links: skillresults.links,
          }});
          browserHistory.push('/skills/' + skillresults.id);
        // console.log(res.data);
      });
  }

  deleteSkill() {
    axios.delete(api + '/skills/' + this.state.currentSkill.skill_id)
     .then(function(res){
       this.setState({
         skills: this.state.skills.filter(function(skill){
           return skill.id !== this.state.currentSkill.skill_id;
         }.bind(this)),
         currentSkill: {
           skill_id: "",
           name: "",
           skill_type: "",
           links: [],
         },
       });
     }.bind(this))
     .catch(err => {
       console.log(err);
     });
  }

  componentDidMount() {
    console.log(process.env)
    const currentId = (this.props.params) ? this.props.params.id : null;
    axios.get(api + `/skills/`)
      .then(res => {
        const skills = res.data.map(obj => obj);
        this.setState({ skills });
        if (currentId) {
          const matching = this.state.skills
            .filter((skill) => skill.id == currentId)[0];
          if (matching){
            this.setState({
              currentSkill: {
                skill_id: matching.id,
                name: matching.name,
                skill_type: matching.skill_type,
                links: matching.links
              }
            });
          } else {
            browserHistory.push("/skills")
          }
        }
      });
  }

  render() {
    const onSkillTypeChange = ev => this.onChange("skill_id", ev.id);
    return (
        <div>
          <Row>
            <Col xs={4} md={4}>
              <form onSubmit={ev => this.onSubmit(ev)}>
              <Select
                name="skills"
                labelKey="name"
                value={this.state.skill_type}
                onChange={onSkillTypeChange}
                options={this.state.skills}
              />
              </form>
            </Col>
            <Button
              name="SkillAdd"
              bsStyle="primary"
              onClick={this.openModal}
              >
            Add Skill</Button>

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="SkillModal"
            >
              <SkillForm api={api} closeModal={this.closeModal} />
            </Modal>

            {/* <Col xs={4} md={4} /> */}

          </Row>

          <h1>{this.state.currentSkill.name}</h1>
          <h4>{this.state.currentSkill.skill_type}</h4>
          <div>{this.state.currentSkill.links}</div>
          <Button
            name="SkillDelete"
            bsStyle="danger"
            onClick={this.openDeleteModal}
            disabled={this.state.currentSkill.skill_id === ""}
          >
              Delete
            </Button>
            <Modal
              isOpen={this.state.deleteModalIsOpen}
              onAfterOpen={this.afterDeleteModal}
              onRequestClose={this.closeDeleteModal}
              contentLabel="DeleteSkillModal"
            >
              <DeleteSkillModal
                doDelete={this.deleteSkill}
                closeModal={this.closeDeleteModal}
              />
            </Modal>

        </div>
    );
  }
}

export default Skills
