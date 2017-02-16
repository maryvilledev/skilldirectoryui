import React, { PropTypes } from 'react';
import { Col, ControlLabel, Button,
   Form, FormControl, FormGroup } from 'react-bootstrap'

const skillTypes = [
  { value: 'compiled', label: 'Compiled' },
  { value: 'scripted', label: 'Scripted' },
  { value: 'database', label: 'Database' },
  { value: 'orchestration', label: 'Orchestration' }
];

const options = skillTypes.map((type, index) => {
  return (
    <option key={index} value={type.value}>
      {type.label}
    </option>
  );
});

class AddSkillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill_name: "",
      skill_type: skillTypes[0].value
    };
    this.onChange = this.onChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key) {
    return (value) => {
      this.setState({
        [key]: value
      });
    }
  }

  onNameChange(ev) {
    this.onChange('skill_name')(ev.target.value);
  }

  onTypeChange(ev) {
    console.log('addskillform typechange ev:')
    console.log(ev);
    this.onChange('skill_type')(ev.target.value);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(
      this.state.skill_name,
      this.state.skill_type
    );
  }

  render() {
    return (
      <div>
        <h1>Add Skill</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId='skillName'>
            <Col componentClass={ControlLabel} sm={2}>
              Name:
            </Col>
            <Col sm={10}>
              <FormControl name='skillName' onChange={this.onNameChange}/>
            </Col>
          </FormGroup>
          <FormGroup controlId='skillType'>
            <Col componentClass={ControlLabel} sm={2}>
              Type:
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" onChange={this.onTypeChange}>
                {options}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={1}>
              <Button type="submit" bsStyle="primary">
                Submit
              </Button>
            </Col>
            <Col smOffset={1} sm={2}>
              <Button onClick={this.props.onCancel} bsStyle="info">
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

AddSkillForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddSkillForm;
