import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';

import ReviewPanel from './ReviewPanel.jsx';
import SelectedItem from './SelectedItem.jsx';
import SkillLinksDisplay from './SkillLinksDisplay.jsx';
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
    this.getFormProps = this.getFormProps.bind(this);

    this.addSkill = this.addSkill.bind(this);
    this.addSkillLink = this.addSkillLink.bind(this);
    this.addSkillReview = this.addSkillReview.bind(this);

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
          onCancel: this.closeModal,
          onSubmit: this.addSkillLink,
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
          onCancel: this.closeModal,
          onSubmit: this.addSkillReview,
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

  addSkillLink(newLinkData) {
    const postData = {
      link_type: newLinkData.linkType,
      name: newLinkData.linkName,
      skill_id: this.state.currentSkill.skill_id,
      url: newLinkData.linkUrl,
    };
    axios.post(`${api}/links/`, postData)
    .then((response) => {
      this.closeModal();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  addSkillReview(newReviewData) {
    const postData = {
      skill_id: this.state.currentSkill.skill_id,
      team_member_id: newReviewData.teamMemberId,
      body: newReviewData.body,
      positive: newReviewData.positive,
    };
    // Post form data to API endpoint
    axios.post(`${api}/skillreviews/`, postData)
    .then((response) => {
      this.closeModal();
    })
    .catch((err) => {
      console.log(`Error POSTing skill review: ${err}`);
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
        const skillResults = res.data;
        this.setState({
          currentSkill: {
            skill_id: skillResults.id,
            name: skillResults.name,
            skill_type: skillResults.skill_type,
            links: skillResults.links,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isError: true });
      });
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
    if (this.state.reviews) {
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
            <SkillLinksDisplay
              links={this.state.currentSkill.links}
            />
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

export default Skills;
