import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import Select from 'react-select';

import AddSkillForm from './AddSkillForm.jsx';
import DeleteModal from './DeleteModal.jsx';
import LinkForm from './AddSkillLinkForm.jsx'
import SelectedItem from './SelectedItem.jsx';
import ReviewForm from './AddSkillReviewForm.jsx'
import { ModalStyle } from './Styles'

const api = (process.env.REACT_APP_API);

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      isModalDisplayed: false,
      displayedModalType: '',
      skillModalIsOpen: false,
      linkModalIsOpen: false,
      reviewModalIsOpen: false,
      deleteModalIsOpen: false,
      currentSkill: {
        skill_id: '',
        name: '',
        skill_type: '',
        links: [],
      },
    };

    // Bind all the things

    // this.openNewModal = this.openNewModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);

    this.shouldDelete = this.shouldDelete.bind(this);
    this.makeLinks = this.makeLinks.bind(this);
    this.openSkillModal = this.openSkillModal.bind(this);
    this.closeSkillModal = this.closeSkillModal.bind(this);
    this.openLinkModal = this.openLinkModal.bind(this);
    this.closeLinkModal = this.closeLinkModal.bind(this);
    this.openReviewModal = this.openReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);

    this.addSkill = this.addSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.onChange = this.onChange.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);

    this.loadSkills = this.loadSkills.bind(this);
    this.loadCurrentSkill = this.loadCurrentSkill.bind(this);
  }

  openSkillModal() { this.setState({skillModalIsOpen: true}); }
  closeSkillModal() { this.setState({skillModalIsOpen: false}); }
  openLinkModal() { this.setState({linkModalIsOpen: true}); }
  closeLinkModal() { this.setState({linkModalIsOpen: false}); }
  openReviewModal() { this.setState({reviewModalIsOpen: true}); }
  closeReviewModal() { this.setState({reviewModalIsOpen: false}); }
  openDeleteModal() { this.setState({deleteModalIsOpen: true}); }
  closeDeleteModal() { this.setState({deleteModalIsOpen: false}); }

  componentDidMount() {
    const currentId = (this.props.params) ? this.props.params.id : null;
    if (!currentId) {
      this.loadSkills();
    } else {
      this.loadCurrentSkill(currentId).then(this.loadSkills);
    }
  }

  onChange(key, value) {
    axios.get(`${api}/skills/${value}`)
      .then((response) => {
        const skill = response.data;
        this.setState({
          currentSkill: {
            skill_id: skill.id,
            name: skill.name,
            skill_type: skill.skill_type,
            links: skill.links,
          },
        });
        browserHistory.push(`/skills/${skill.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNewModalType(modalType) {
    return () => {
      this.setState({
        displayedModalType: modalType,
        isModalDisplayed: true,
      });
    };
  }

  closeModal() {
    this.setState({
      displayedModalType: '',
      isModalDisplayed: false,
    });
  }

  shouldDelete(response) {
    if (response) {
      this.deleteSkill();
    }
    this.closeDeleteModal();
  }

  addSkill(skillName, skillType) {
    axios.post(`${api}/skills/`, {
      name: skillName,
      skill_type: skillType,
    })
      .then(() => {
        this.closeSkillModal();
        this.loadSkills();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteSkill() {
    axios.delete(`${api}/skills/${this.state.currentSkill.skill_id}`)
     .then((response) => {
       this.setState({
         skills: this.state.skills.filter((skill) => {
           return skill.id !== this.state.currentSkill.skill_id;
         }),
         currentSkill: {
           skill_id: '',
           name: '',
           skill_type: '',
           links: [],
         },
       });
     })
     .catch((err) => {
       console.log(err);
     });
  }

  loadSkills() {
    return axios.get(`${api}/skills/`)
      .then((response) => {
        const skills = response.data.slice();
        this.setState({
          skills: skills
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadCurrentSkill(currentId) {
    return axios.get(`${api}/skills/${currentId}`)
      .then((res) => {
        const skillresults = res.data;
        this.setState({
          currentSkill: {
            skill_id: skillresults.id,
            name: skillresults.name,
            skill_type: skillresults.skill_type,
            links: skillresults.links,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isError: true });
      });
  }

  makeLinks() {
    const links = this.state.currentSkill.links;
    if (links && links.length) {
      const linkElements = links.map((link) => {
        return (
          <li key={link.id}>
            { `${capitalizeFirstLetter(String(link.link_type))}: ` }
            <a href={link.url}>{link.name}</a>
          </li>
        );
      });
      return (
        <div>
          <h3>Links:</h3>
          <ul>
            {linkElements}
          </ul>
        </div>
      );
    }
    return null;
  }

  render() {
    const onSkillChange = ev => this.onChange('skill_id', ev.id);
    const currentSkillID = this.state.currentSkill.skill_id;
    const isSkillSelected = currentSkillID !== '';
    let display = null;
    if (isSkillSelected) {
      display = (
        <SelectedItem
          typeName="Skill"
          deleteCallback={this.openDeleteModal}
        >
          <h1>{this.state.currentSkill.name}</h1>
          <h4>{this.state.currentSkill.skill_type}</h4>
          {this.makeLinks()}
          <Button
            name="AddLink"
            bsStyle="primary"
            onClick={this.openLinkModal}
          >
            Add Link
          </Button>
          <Button
            name="AddReview"
            bsStyle="primary"
            onClick={this.openReviewModal}
          >
            Add Review
          </Button>
        </SelectedItem>
      );
    }
    if (!this.state.isError) {
      return (
        <div>
          <Row>
            <Col xs={4} md={4}>
              <Select
                name="skills"
                labelKey="name"
                onChange={onSkillChange}
                value={this.state.currentSkill.skill_type}
                options={this.state.skills}
              />
            </Col>
            <Button
              name="AddSkill"
              bsStyle="primary"
              onClick={this.openSkillModal}
            >
              Add Skill
            </Button>
            <Modal
              isOpen={this.state.skillModalIsOpen}
              onRequestClose={this.closeSkillModal}
              contentLabel="SkillModal"
            >
              <AddSkillForm
                onSubmit={this.addSkill}
              />
            </Modal>
            <Modal
              isOpen={this.state.linkModalIsOpen}
              onRequestClose={this.closeLinkModal}
              contentLabel="LinkModal"
              style={ModalStyle}
            >
              <LinkForm
                api={api}
                closeModal={this.closeLinkModal}
                skill_id={currentSkillID}
              />
            </Modal>
            <Modal
              isOpen={this.state.reviewModalIsOpen}
              onRequestClose={this.closeReviewModal}
              contentLabel="ReviewModal"
              style={ModalStyle}
            >
              <ReviewForm
                api={api}
                closeModal={this.closeReviewModal}
                skill_id={currentSkillID}
              />
            </Modal>
          </Row>

          {display}

          <Modal
            isOpen={this.state.deleteModalIsOpen}
            onRequestClose={this.closeDeleteModal}
            contentLabel="DeleteSkillModal"
            style={ModalStyle}
          >
            <DeleteModal
              shouldDelete={this.shouldDelete}
            />
          </Modal>
        </div>
      );
    } else {
      return (
        //TODO, replace with more savory alert
        <h1>ERROR!</h1>
      );
    }
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Skills;
