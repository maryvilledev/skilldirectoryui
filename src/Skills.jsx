import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';

import ReviewPanel from './ReviewPanel.jsx';
import SelectedItem from './SelectedItem.jsx';
import SkillLinksDisplay from './SkillLinksDisplay.jsx';
import SkillModalContainer from './SkillModalContainer.jsx';
import WithLogin from './WithLogin.jsx';

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
      reviews: [],
    };

    // Bind all the things
    this.openNewModalType = this.openNewModalType.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);
    this.makeIcon = this.makeIcon.bind(this);
    this.getFormProps = this.getFormProps.bind(this);

    this.addSkill = this.addSkill.bind(this);
    this.addSkillLink = this.addSkillLink.bind(this);
    this.addSkillReview = this.addSkillReview.bind(this);

    this.deleteSkill = this.deleteSkill.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);
    this.loadSkills = this.loadSkills.bind(this);
    this.loadCurrentSkill = this.loadCurrentSkill.bind(this);
    this.loadReviews = this.loadReviews.bind(this);
    this.onSkillChange = this.onSkillChange.bind(this);
    this.onIconSelected = this.onIconSelected.bind(this);
  }

  componentDidMount() {
    // // Fetch all skills
    this.loadSkills()
    .then(() => {
      // Load the current skill only if there was an id param (in the URL)
      if (this.props.params && this.props.params.id) {
        this.loadCurrentSkill(this.props.params.id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onSkillChange(ev) {
    // Get the ID of the selected skill
    const skillId = ev.id;
    // Load the current skill's info and then route the user
    return this.loadCurrentSkill(skillId)
      .then(browserHistory.push(`/skills/${skillId}`))
      .catch((err) => {
        console.log(err);
      });
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

  addSkill(skillName, skillType) {
    return axios.post(`${api}/skills/`, {
      name: skillName,
      skill_type: skillType,
    })
    .then(this.closeModal)
    .then(() => {
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
    .then(this.closeModal)
    .then(() => {
      this.loadCurrentSkill(this.state.currentSkill.skill_id);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addSkillReview(newReviewData) {
    const postData = {
      skill_id: this.state.currentSkill.skill_id,
      team_member_id: newReviewData.teamMemberId,
      body: newReviewData.body,
      positive: newReviewData.positive,
    };
    // Post form data to API endpoint
    return axios.post(`${api}/skillreviews/`, postData)
    .then(this.closeModal)
    .then(() => {
      this.loadReviews();
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
            icon: skillResults.icon,
          },
        });
      })
      .then(this.loadReviews)
      .catch((err) => {
        console.log(err);
        this.setState({ isError: true });
      });
  }

  makeIcon() {
    const icon = this.state.currentSkill.icon;
    if (icon && icon.url !== '') {
      return (
        <a 
          href="#"
          onClick={alert("test!")}
        >
          <img
            src={icon.url}
            alt="Skill Icon"
            width="200"
            style={{ "margin-top": "30px" }} />
        </a>
      );
      /*return (
        <button 
          style={{ 
            "background": "transparent", 
            "border": "none !important" }}
        >
          <img
            src={icon.url}
            alt="Skill Icon"
            width="200"
            style={{ "margin-top": "30px" }} />
        </button>
      );*/
    }
    return null;
  }

  loadReviews() {
    const currentId = this.state.currentSkill.skill_id;
    return axios.get(`${api}/skillreviews?skill_id=${currentId}`)
      .then((response) => {
        const reviews = response.data;
        this.setState({
          reviews,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  shouldDelete(response) {
    if (response) {
      this.deleteSkill();
    }
    this.closeModal();
  }

  deleteSkill() {
    axios.delete(`${api}/skills/${this.state.currentSkill.skill_id}`)
     .then(() => {
       this.setState({
         currentSkill: {
           skill_id: '',
           name: '',
           skill_type: '',
           links: [],
         },
         reviews: [],
       });
     })
     .then(this.loadSkills)
     .then(() => {
       browserHistory.push('/skills/');
     })
     .catch((err) => {
       console.log(err);
     });
  }

  onIconSelected(ev) {
    // Setup form data for multipart POST request
    const formData = new FormData();
    formData.append('skill_id', this.state.currentSkill.skill_id)
    formData.append('icon', ev.target.files[0])

    // Send request to API
    axios.post(`${api}/skillicons`, formData)
    .then(res => location.reload())
    .catch(err => console.log(`Caught an Error: ${err}`));
  }

  render() {
    const currentSkillID = this.state.currentSkill.skill_id;
    const isSkillSelected = currentSkillID !== "";
    const icon = this.makeIcon();
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
        <Row>
          <Col md={2} mdOffset={3}>
            <SelectedItem
              typeName="Skill"
              deleteCallback={this.openNewModalType('DeleteSkill')}
            >
              <Row>
                <Col>
                  {icon}
                  <h1>{this.state.currentSkill.name}</h1>
                  <h3>{this.state.currentSkill.skill_type}</h3>
                  <SkillLinksDisplay
                    links={this.state.currentSkill.links}
                    onClick={this.openNewModalType('AddLink')}
                  />
                  <div>
                    <WithLogin>
                      <input
                        type="file"
                        multiple size="1"
                        onChange={this.onIconSelected} />
                    </WithLogin>
                  </div>
                </Col>
              </Row>
            </SelectedItem>
          </Col>
          <Col xs={5} style={{ "margin-top": 100 }}>
            <Row>
              <Col xs={3} style={{ "margin-right": -10 }}>
                <h3>Skill Reviews</h3>
              </Col>
              <Col style={{ "margin-top": 20 }}>
                <WithLogin>
                  <Button
                    name="AddReview"
                    bsStyle="primary"
                    onClick={this.openNewModalType('AddReview')}>
                    Add Review
                  </Button>
                </WithLogin>
              </Col>
            </Row>
            <div style={{ "margin-top": 15 }}>{reviewList}</div>
          </Col>
        </Row>
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
                onChange={this.onSkillChange}
                value={this.state.currentSkill.skill_type}
                options={this.state.skills}
              />
            </Col>
            <WithLogin>
              <Button
                name="AddSkill"
                bsStyle="primary"
                onClick={this.openNewModalType('AddSkill')}
              >
                Add Skill
              </Button>
            </WithLogin>
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

Skills.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default Skills;
