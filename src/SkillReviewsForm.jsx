import React from 'react';
import axios from 'axios';
import {Col, ControlLabel, Button, 
  Form, FormControl, FormGroup } from 'react-bootstrap'

class SkillReviewsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: null,
      team_member_id: "",
      positive: true,
      body:     '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.api}/teammembers/`)
      .then((result) => {
        console.log(result.data);
        this.setState({ teamMembers: result.data });
      })
      .catch((err) => {
        console.log(`Error GETing team members: ${err}`);
      });
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    // Error Checking
    if(this.state.body === '') {
      alert('Cannot submit empty review.');
      return;
    }
    if(this.state.team_member_id === '') {
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
    const onPositiveChange = ev => this.onChange('positive', ev.target.value);
    const onBodyChange = ev => this.onChange('body', ev.target.value);
    const onTeamMemberChange = ev =>
      this.onChange('team_member_id', ev.target.value);
    let teamMembers = null;
    if(this.state.teamMembers != null) {
      teamMembers = this.state.teamMembers.map(teamMember =>
        <option 
          key={teamMember.id} 
          value={teamMember.id}>
          {teamMember.name}
        </option>
      );
    }
    return (
      <div>
        <h1>Add Skill Review</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId='teamMember'>
            <Col componentClass={ControlLabel} sm={4}>
              Select a Team Member:
            </Col>
            <Col sm={8}>
              <FormControl
                componentClass='select'
                onChange={onTeamMemberChange}>
                <option key={0} value={null} />
                {teamMembers}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId='reviewPositive'>
            <Col componentClass={ControlLabel} sm={4}>
              Is This a Positive Review?
            </Col>
            <Col sm={8}>
              <FormControl 
                componentClass='select' 
                onChange={onPositiveChange}>
                <option key={true} value={true}>Yes</option>
                <option key={false} value={false}>No</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId='reviewBody'>
            <Col componentClass={ControlLabel} sm={2}>
              Review:
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass='textarea'
                style={{ height: 150 }}
                onChange={onBodyChange}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit' bsStyle='primary'>
                Submit 
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SkillReviewsForm