import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col, Button, Grid, FormControl } from 'react-bootstrap';

import ReviewPanel from './ReviewPanel.jsx';
import SkillLinksDisplay from './SkillLinksDisplay.jsx';
import SkillModalContainer from './SkillModalContainer.jsx';
import WithLogin from './WithLogin.jsx';
import Icon from './Icon.jsx';
import { mapSkillType } from './util/util.js'

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
        ID: 0,
        name: '',
        skill_type: '',
        Links: [],
        icon: '',
        SkillReviews: [],
      }
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
    this.shouldDelete = this.shouldDelete.bind(this);
    this.loadSkills = this.loadSkills.bind(this);
    this.loadCurrentSkill = this.loadCurrentSkill.bind(this);
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
    const skillId = ev.target.value;
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
      skill_id: this.state.currentSkill.ID,
      url: newLinkData.linkUrl,
    };
    axios.post(`${api}/links/`, postData)
    .then(this.closeModal)
    .then(() => {
      this.loadCurrentSkill(this.state.currentSkill.ID);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addSkillReview(newReviewData) {
    console.log(newReviewData)
    const postData = {
      skill_id: this.state.currentSkill.ID,
      team_member_id: parseInt(newReviewData.team_member_id),
      body: newReviewData.body,
      positive: newReviewData.positive,
    };
    console.log(postData)
    // Post form data to API endpoint
    return axios.post(`${api}/skillreviews/`, postData)
    .then(this.closeModal)
    .then(() => {
      this.loadCurrentSkill(this.state.currentSkill.ID);
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
            skill_id: skillResults.skill_id,
            ID: skillResults.ID,
            name: skillResults.name,
            skill_type: skillResults.skill_type,
            links: skillResults.Links,
            icon: skillResults.icon_url,
            SkillReviews: skillResults.SkillReviews,
          },
        });
        console.log(this.state.currentSkill)
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isError: true });
      });
  }

  shouldDelete(response) {
    if (response) {
      this.deleteSkill();
    }
    this.closeModal();
  }

  deleteSkill() {
    axios.delete(`${api}/skills/${this.state.currentSkill.ID}`)
     .then(() => {
       this.setState({
         currentSkill: {
           skill_id: '',
           ID: 0,
           name: '',
           skill_type: '',
           links: [],
           SkillReviews: [],
         }
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
    console.log(this.state.currentSkill);
    // Setup form data for multipart POST request
    const formData = new FormData();
    formData.append('skill_id', this.state.currentSkill.ID)
    formData.append('icon', ev.target.files[0])

    // Send request to API
    axios.post(`${api}/skillicons`, formData)
    .then(res => location.reload())
    .catch(err => console.log(`Caught an Error: ${err}`));
  }

  render() {
    const currentSkillID = this.state.currentSkill.ID;
    const isSkillSelected = currentSkillID !== 0;
    const skillOptions = this.state.skills.map((skill, idx) =>
      <option key={idx} value={skill.ID}>
        {skill.name}
      </option>
    );
    let reviews = null;
    if (this.state.currentSkill.SkillReviews) {
      reviews = this.state.currentSkill.SkillReviews.map(review => {
        return <ReviewPanel review={review} key={review.timestamp}/>
      });
    }
      const reviewList = (
        <div>{reviews}</div>
      );
      let display = null;
      if (isSkillSelected) {
      display = (
        <Grid>
          <Col sm={4} md={3} mdOffset={1} style={{ marginRight: '5%' }}>
            <Icon
              icon={this.state.currentSkill.icon}
              onIconUploaded={this.onIconSelected}
            />
            <Row>
              <table style={{width: '250px'}}>
                <tr>
                  <td>
              <h1>{this.state.currentSkill.name}</h1>
              </td>
              <td>
              <WithLogin>
                <Button
                  name={'DeleteSkill'}
                  bsStyle='danger'
                  bsSize='small'
                  onClick={this.openNewModalType('DeleteSkill')}
                  children='Delete'
                  style={{ marginLeft: '15%', marginTop: '12%' }}
                />
              </WithLogin>
            </td>
          </tr>
          </table>
        </Row>
        <h4>{mapSkillType(this.state.currentSkill.skill_type)}</h4>
        <SkillLinksDisplay
          links={this.state.currentSkill.links}
          onClick={this.openNewModalType('AddLink')}
        />
      </Col>
      <Col sm={10} md={7} style={{ "margin-top": 25 }}>
        <Row>
          <table style={{width: '100%'}}>
          <tr>
            <td align='left'>
            <h2>Skill Reviews</h2>
            </td>
            <td align='right'>
            <WithLogin>
              <Button
                name="AddReview"
                bsStyle="info"
                bsSize="small"
                onClick={this.openNewModalType('AddReview')}
                style={{ float: 'right', marginTop: '12%' }}>
                Add Review
              </Button>
            </WithLogin>
            </td>
          </tr>
          </table>
        </Row>
        <Row>
          {reviewList}
        </Row>
      </Col>
      </Grid>
      );
    }

    if (!this.state.isError) {
      return (
        <div>
          <Row>
            <Col xs={4} md={4}>
              <FormControl
                name='skills'
                componentClass='select'
                onChange={this.onSkillChange} >
                {<option selected disabled>Select A Skill...</option>}
                {skillOptions}
              </FormControl>
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
    ID: PropTypes.string,
  }).isRequired,
};

export default Skills;
