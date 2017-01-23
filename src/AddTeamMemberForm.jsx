import React, { PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, ControlLabel, Button,
   Form, FormControl, FormGroup } from 'react-bootstrap';

class AddTeamMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMemberName: '',
      teamMemberTitle: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(key) {
    // Return a curried function that sets a value to the key in this.state
    return (value) => {
      this.setState({
        [key]: value,
      });
    };
  }
  onNameChange(ev) {
    this.onChange('teamMemberName')(ev.target.value);
  }
  onTitleChange(ev) {
    this.onChange('teamMemberTitle')(ev.target.value);
  }
  onSubmit(ev) {
    ev.preventDefault();
    const name = this.state.teamMemberName;
    if (!name) {
      alert('Please enter a name');
      return;
    }
    const title = this.state.teamMemberTitle;
    if (!title) {
      alert('Please enter a title');
      return;
    }
    this.props.onSubmit(name, title);
  }
  render() {
    return (
      <div>
        <h1>Add a Team Member</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="teamMemberName">
            <Col componentClass={ControlLabel} sm={2}>
              Name:
            </Col>
            <Col sm={10}>
              <FormControl
                name="teamMemberName"
                componentClass="input"
                onChange={this.onNameChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="teamMemberTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Title:
            </Col>
            <Col sm={10}>
              <FormControl
                name="teamMemberTitle"
                componentClass="input"
                onChange={this.onTitleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={2}>
              <Button type="submit" bsStyle="primary">
                Submit
              </Button>
            </Col>
            <Col smOffset={2}>
              <Button onClick={this.props.closeModal} bsStyle="info">
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

AddTeamMemberForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddTeamMemberForm;
