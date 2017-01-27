import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Select from 'react-select';

import ReviewPanel from './ReviewPanel.jsx';
import SelectedItem from './SelectedItem.jsx';
import SkillModalContainer from './SkillModalContainer.jsx';

const api = (process.env.REACT_APP_API);

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      isModalDisplayed: false,
      displayedModalType: '',
      currentSkill: {
        skill_id: '',
        name: '',
        skill_type: '',
        links: [],
      },
    };

    // Bind all the things

    this.openNewModalType = this.openNewModalType.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);
    this.makeLinks = this.makeLinks.bind(this);
    this.getFormProps = this.getFormProps.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.onChange = this.onChange.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);
    this.loadSkills = this.loadSkills.bind(this);
    this.loadCurrentSkill = this.loadCurrentSkill.bind(this);
    this.loadReviews = this.loadReviews.bind(this);
  }

  componentDidMount() {
    const currentId = (this.props.params) ? this.props.params.id : null;
    if (!currentId) {
      this.loadSkills();
    } else {
      this.loadCurrentSkill(currentId).then(this.loadSkills).then(this.loadReviews);
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
      }).then(this.loadReviews);
  }

  getFormProps(modalType) {
    // If a modal is being rendered in <SkillModal />, we need to pass in the
    // props for by the form.
    switch (modalType) {
      case 'AddLink': {
        return {
          api,
          closeModal: this.closeModal,
          skill_id: this.state.currentSkill.skill_id,
        };
      }
      case 'AddSkill': {
        return {
          onCancel: this.closeModal,
          onSubmit: this.addSkill,
        };
      }
      case 'AddReview': {
        return {
          api,
          closeModal: this.closeModal,
          skill_id: this.state.currentSkill.skill_id,
        };
      }
      case 'DeleteSkill': {
        return {
          shouldDelete: this.shouldDelete,
        };
      }
      default: {
        // if there is no modal to render, or if an invalid type has been
        // requested, return an empty object
        return {};
      }
    }
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
    this.closeModal();
  }

  addSkill(skillName, skillType) {
    axios.post(`${api}/skills/`, {
      name: skillName,
      skill_type: skillType,
    })
      .then(() => {
        this.closeModal();
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
     .then(() => {
       browserHistory.push('/skills/');
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
          skills,
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

  loadReviews() {
    const currentId = this.state.currentSkill.skill_id;
    return axios.get(`${api}/skillreviews?skill_id=${currentId}`)
      .then(res => {
        const results = res.data;
        this.setState({
          reviews: results
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const onSkillChange = ev => this.onChange('skill_id', ev.id);
    const currentSkillID = this.state.currentSkill.skill_id;
    const isSkillSelected = currentSkillID !== "";
    let reviews = null;
    if (this.state.reviews){
      reviews = this.state.reviews.map(review => {
        return <ReviewPanel review={review} key={review.timestamp}/>
      });
    }
    const reviewList = (
      <div>{reviews}</div>
    );
    let display = null;
    if (isSkillSelected) {
      display = (
        <div>
          <SelectedItem
            typeName="Skill"
            deleteCallback={this.openNewModalType('DeleteSkill')}
          >
            <h1>{this.state.currentSkill.name}</h1>
            <h4>{this.state.currentSkill.skill_type}</h4>
            {this.makeLinks()}
            <Button
              name="AddLink"
              bsStyle="primary"
              onClick={this.openNewModalType('AddLink')}
            >
              Add Link
            </Button>
            <Button
              name="AddReview"
              bsStyle="primary"
              onClick={this.openNewModalType('AddReview')}>
              Add Review
            </Button>
          </SelectedItem>
          {reviewList}
        </div>
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
              onClick={this.openNewModalType('AddSkill')}
            >
              Add Skill
            </Button>
            <SkillModalContainer
              closeModalCallback={this.closeModal}
              displayedModalType={this.state.displayedModalType}
              formProps={this.getFormProps(this.state.displayedModalType)}
              isModalDisplayed={this.state.isModalDisplayed}
            />
          </Row>
          {display}
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
