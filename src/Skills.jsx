import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import { Row, Col }  from 'react-bootstrap';
import axios from 'axios';
import SkillForm from './SkillsModal'

var Select = require('react-select');
var api = (process.env.REACT_APP_API);

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      modalIsOpen: false,
      currentSkill: {
        skill_id: "",
        name: "",
        skill_type: "",
        links: [],
      }
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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

        // console.log(res.data);
      });
  }

  componentDidMount() {
    console.log(process.env)
    axios.get(api + `/skills/`)
      .then(res => {
        const skills = res.data.map(obj => obj);
        this.setState({ skills });
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
            <Button bsStyle="primary" onClick={this.openModal}>Add Skill</Button>

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

        </div>
    );
  }
}

export default Skills