import React from 'react';

import axios from 'axios';


import 'react-select/dist/react-select.css';

var Select = require('react-select');

var skillTypes = [
  { value: 'compiled', label: 'Compiled' },
  { value: 'scripted', label: 'Scripted' },
  { value: 'database', label: 'Database' },
  { value: 'orchestration', label: 'Orchestration' }
];


class SkillForm extends React.Component {
  constructor() {
    super();
    this.state = {
      skill_name: "",
      skill_type: ""
    };
  }

  logChange(val) {
    console.log("Selected:" + val);
  }


  onChange(key, value) {
    this.setState({ [key]: value});
  }

  onSubmit(ev) {
    ev.preventDefault();
    const skill_name = this.state.skill_name;
    const skill_type = this.state.skill_type;

    axios.post(`http://localhost:8080/skills/`, {
        name: skill_name,
        skill_type: skill_type
    })

    .then(function (response) {
      console.log(response);
    })
    .catch(err => {
    console.log('caught an error', err);
  });
  }

  render() {
    const onSkillNameChange = ev => this.onChange("skill_name", ev.target.value);
    const onSkillTypeChange = ev => this.onChange("skill_type", ev.value);
    return (
      <form onSubmit={ev => this.onSubmit(ev)}>
        <div>Name: <input name="skill_name" type="text" value={this.state.skill_name} onChange={onSkillNameChange} /></div>
        <div>Skill Type: <Select name="skill_type" value={this.state.skill_type} onChange={onSkillTypeChange} options={skillTypes} /></div>
        <button type="submit">Save</button>
        </form>
    );
  }
}

export default SkillForm
