import React from 'react';
import axios from 'axios';
import { Col, ControlLabel, Button,
   Form, FormControl, FormGroup } from 'react-bootstrap'

const skillTypes = [
  { value: 'compiled', label: 'Compiled' },
  { value: 'scripted', label: 'Scripted' },
  { value: 'database', label: 'Database' },
  { value: 'orchestration', label: 'Orchestration' }
];

class SkillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill_name: "",
      skill_type: skillTypes[0].value
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key, value) {
    this.setState({ [key]: value});
  }

  onSubmit(ev) {
    ev.preventDefault();
    const skill_name = this.state.skill_name;
    const skill_type = this.state.skill_type;

    axios.post(this.props.api + '/skills/', {
        name: skill_name,
        skill_type: skill_type
    })
    .then(function (response) {
      console.log(response);
      this.props.closeModal();
    }.bind(this))
    .catch(err => {
      console.log('caught an error', err);
    });
  }

  render() {
    const onSkillNameChange = ev => this.onChange("skill_name", ev.target.value);
    const onSkillTypeChange = ev => this.onChange("skill_type", ev.target.value);
    const options = skillTypes.map(type =>
       (<option key={type.value} value={type.value}>{type.label}</option>)
       );
    return (
      <div>
        <h1>Add Skill</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId='skillName'>
            <Col componentClass={ControlLabel} sm={2}>
              Name:
            </Col>
            <Col sm={10}>
              <FormControl name='skillName' onChange={onSkillNameChange}/>
            </Col>
          </FormGroup>
          <FormGroup controlId='skillType'>
            <Col componentClass={ControlLabel} sm={2}>
              Type:
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" onChange={onSkillTypeChange}>
                {options}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="primary">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SkillForm
