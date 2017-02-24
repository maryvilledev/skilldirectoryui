import React, { PropTypes } from 'react';
import axios from 'axios';
import { Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  ButtonToolbar } from 'react-bootstrap';

const validateInput = (userInput) => {
  if (userInput.body === '') {
    alert('Cannot submit empty review.');
    return false;
  }
  if (userInput.team_member_id === '') {
    alert('Please select a Team Member.');
    return false;
  }
  return true;
};

class AddSkillReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: null,
      team_member_id: 0,
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
        console.log(result.data)
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
    if (!validateInput(this.state)) {
      return;
    }
    // Call the onSubmit callback to let Skills handle submitting the review
    this.props.onSubmit(this.state);
  }

  render() {
    let teamMembers = null;
    if (this.state.teamMembers != null) {
      teamMembers = this.state.teamMembers.map((teamMember) => {
        return (
          <option
            key={teamMember.ID}
            value={teamMember.ID}
          >
            {teamMember.name}
          </option>
        );
      });
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
                onChange={this.onBodyChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2}>
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary">
                  Submit
                </Button>
                <Button onClick={this.props.onCancel} bsStyle="info">
                  Cancel
                </Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

AddSkillReviewForm.propTypes = {
  api: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddSkillReviewForm;
