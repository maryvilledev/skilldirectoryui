import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import { Row, Col }  from 'react-bootstrap';
import axios from 'axios';
import LinkForm from './LinksForm'
import SkillForm from './SkillsForm'
import DeleteSkillModal from './DeleteSkillModal'

var Select = require('react-select');
var api = (process.env.REACT_APP_API);

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      skillModalIsOpen: false,
      linkModalIsOpen: false,
      deleteModalIsOpen: false,
      currentSkill: {
        skill_id: "",
        name: "",
        skill_type: "",
        links: [],
      }
    };

    // Bind all the things
    this.openSkillModal = this.openSkillModal.bind(this);
    this.closeSkillModal = this.closeSkillModal.bind(this);
    this.openLinkModal = this.openLinkModal.bind(this);
    this.closeLinkModal = this.closeLinkModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  openSkillModal() { this.setState({skillModalIsOpen: true}); }

  closeSkillModal() { this.setState({skillModalIsOpen: false}); }

  openLinkModal() { this.setState({linkModalIsOpen: true}); }

  closeLinkModal() { this.setState({linkModalIsOpen: false}); }

  openDeleteModal() { this.setState({deleteModalIsOpen: true}); }

  closeDeleteModal() { this.setState({deleteModalIsOpen: false}); }

  onChange(key, value) {
    console.log("Sending GET request.");
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteSkill() {
    console.log("Sending DELETE request.");
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
    console.log("Sending GET request.");
    axios.get(api + `/skills/`)
      .then(res => {
        const skills = res.data.map(obj => obj);
        this.setState({ skills });
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const onSkillChange = ev => this.onChange("skill_id", ev.id);
    const currentSkillID = this.state.currentSkill.skill_id;
    const isSkillSelected = currentSkillID === "" ? false : true;
    let links = null;
    if(this.state.currentSkill.links != null) {
     links = this.state.currentSkill.links.map(link =>
        <li key={link.id}>
            {capitalizeFirstLetter(String(link.link_type)) + ': '} 
            <a href={link.url}>{link.name}</a>
        </li>
      );
    }
    return (
        <div>
          <Row>
            <Col xs={4} md={4}>
              <form onSubmit={ev => this.onSubmit(ev)}>
              <Select
                name="skills"
                labelKey="name"
                value={this.state.skill_type}
                onChange={onSkillChange}
                options={this.state.skills}
              />
              </form>
            </Col>
            <Button name="AddSkill"
                    bsStyle="primary"
                    onClick={this.openSkillModal}>
              Add Skill
            </Button>
            <Modal
              isOpen={this.state.skillModalIsOpen}
              onRequestClose={this.closeSkillModal}
              contentLabel="SkillModal"
            >
              <SkillForm api={api} 
                         closeModal={this.closeSkillModal} />
            </Modal>

            <Modal
              isOpen={this.state.linkModalIsOpen}
              onRequestClose={this.closeLinkModal}
              contentLabel="LinkModal"
            >
              <LinkForm api={api} 
                        closeModal={this.closeLinkModal} 
                        skill_id={currentSkillID}/>
            </Modal>
            {/* <Col xs={4} md={4} /> */}

          </Row>

          <h1>{this.state.currentSkill.name}</h1>
          <h4>{this.state.currentSkill.skill_type}</h4>
          {isSkillSelected ? <h3>Links:</h3> : null}
          <ul>{links}</ul>

          <Button name="AddLink" 
                  bsStyle="primary" 
                  onClick={this.openLinkModal}
                  disabled={!isSkillSelected}>
            Add Link
          </Button>

          <Button name="DeleteSkill"
                  bsStyle="danger"
                  onClick={this.openDeleteModal}
                  disabled={!isSkillSelected}>
            Delete
          </Button>
          <Modal
            isOpen={this.state.deleteModalIsOpen}
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

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Skills
