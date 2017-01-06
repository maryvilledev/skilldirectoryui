import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';



import axios from 'axios';
import SkillForm from './SkillsModal'



class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      modalIsOpen: false,
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

  componentDidMount() {
    axios.get(`http://localhost:8080/skills/`)
      .then(res => {
        const skills = res.data.map(obj => obj);
        this.setState({ skills });

        console.log(res.data);
      });
  }
  render() {
    return (
      <div>
        <h1>Skills</h1>
        <ul>
          {this.state.skills.map(skill =>
            <li key={skill.id}>{skill.name}    {skill.skill_type}</li>
          )}
        </ul>
        <Button bsStyle="primary" onClick={this.openModal}>Add Skill</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <SkillForm />
        </Modal>
      </div>
    );
  }
}

export default Skills
