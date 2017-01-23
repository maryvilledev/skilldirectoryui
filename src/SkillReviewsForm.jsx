import React, { PropTypes } from 'react';
import axios from 'axios';
import { Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
FormGroup } from 'react-bootstrap';

class SkillReviewsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: null,
      team_member_id: '',
      positive: true,
      body: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPositiveChange = this.onPositiveChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onTeamMemberChange = this.onTeamMemberChange.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.api}/teammembers/`)
      .then((result) => {
        this.setState({ teamMembers: result.data });
      })
      .catch((err) => {
        console.log(`Error GETing team members: ${err}`);
      });
  }

  onChange(key) {
    return (value) => {
      this.setState({
        [key]: value,
      });
    };
  }

  onPositiveChange(ev) {
    // ev.target.value is guaranteed to be a string type so we have to check
    // the contents of ev.target.value
    // I would like to throw an error here since there is something WRONG
    // if ev.target.value is neither 'true' or 'false'
    const isPositive = ev.target.value === 'true';
    this.onChange('positive')(isPositive);
  }

  onBodyChange(ev) {
    this.onChange('body')(ev.target.value);
  }

  onTeamMemberChange(ev) {
    this.onChange('team_member_id')(ev.target.value);
  }

  onSubmit(ev) {
    ev.preventDefault();
    // Error Checking
    if (this.state.body === '') {
      alert('Cannot submit empty review.');
      return;
    }
    if (this.state.team_member_id === '') {
      alert('Please select a Team Member.');
      return;
    }

    // Post form data to API endpoint
    axios.post(`${this.props.api}/skillreviews/`, {
      skill_id:        this.props.skill_id,
      team_member_id:  this.state.team_member_id,
      body:            this.state.body,
      positive:        this.state.positive
    })
    .then(response => {
      console.log(response);
      this.props.closeModal();
    })
    .catch(err => {
      console.log(`Error POSTing skill review: ${err}`);
      alert('Failed to submit review - Sorry ;(');
    });
  }

  render() {
    let teamMembers = null;
    if (this.state.teamMembers != null) {
      teamMembers = this.state.teamMembers.map(teamMember =>
        <option
          key={teamMember.id}
          value={teamMember.id}
        >
          {teamMember.name}
        </option>
      );
    }
    return (
      <div>
        <h1>Add Skill Review</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="teamMember">
            <Col componentClass={ControlLabel} sm={4}>
              Select a Team Member:
            </Col>
            <Col sm={8}>
              <FormControl
                name="teamMemberSelect"
                componentClass="select"
                onChange={this.onTeamMemberChange}
              >
                <option key={0} value={null} />
                {teamMembers}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="reviewPositive">
            <Col componentClass={ControlLabel} sm={4}>
              Is This a Positive Review?
            </Col>
            <Col sm={8}>
              <FormControl
                name="positiveSelect"
                componentClass="select"
                onChange={this.onPositiveChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="reviewBody">
            <Col componentClass={ControlLabel} sm={2}>
              Review:
            </Col>
            <Col sm={10}>
              <FormControl
                name="reviewBody"
                componentClass="textarea"
                style={{ height: 150 }}
                onChange={this.onBodyChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="primary">
                Submit
              </Button>
              <Button sm={2} onClick={this.props.closeModal} bsStyle='info'>
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

SkillReviewsForm.propTypes = {
  api: PropTypes.string.isRequired,
  skill_id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SkillReviewsForm;
