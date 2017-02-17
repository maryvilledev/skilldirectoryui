import React, { PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, ControlLabel, Button,
   Form, FormControl, FormGroup } from 'react-bootstrap';
import { mapLinkType } from './util/util.js';

const linkTypes = [
  { value: 'tutorial',       label: mapLinkType('tutorial')},
  { value: 'blog',           label: mapLinkType('blog')},
  { value: 'webpage',        label: mapLinkType('webpage')},
  { value: 'developer-tool', label: mapLinkType('developer-tool')}
];

const options = linkTypes.map((type, index) => {
  return (
    <option key={index} value={type.value}>
      {type.label}
    </option>
  );
});

/* eslint-disable no-useless-escape */
/* http://stackoverflow.com/a/30970319 */
export function isValidURL(url) {
  const res = url.match(/(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return res != null;
}

const validateInput = (inputs) => {
  if (!inputs.linkName) {
    alert('Please enter a name.');
    return false;
  }
  if (!isValidURL(inputs.linkUrl)) {
    alert('Please enter a valid URL.');
    return false;
  }
  if (!inputs.linkType) {
    alert('Please enter a type.');
    return false;
  }
  return true;
};

class AddSkillLinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkName: '',
      linkUrl: '',
      linkType: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onLinkNameChange = this.onLinkNameChange.bind(this);
    this.onLinkURLChange = this.onLinkURLChange.bind(this);
    this.onLinkTypeChange = this.onLinkTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key) {
    return (value) => {
      this.setState({
        [key]: value,
      });
    };
  }

  onLinkNameChange(ev) {
    this.onChange('linkName')(ev.target.value);
  }

  onLinkURLChange(ev) {
    this.onChange('linkUrl')(ev.target.value);
  }

  onLinkTypeChange(ev) {
    this.onChange('linkType')(ev.target.value);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const newLinkData = this.state;
    // Ensure that valid data was entered
    if (!validateInput(newLinkData)) {
      return;
    }
    this.props.onSubmit(newLinkData);
  }

  render() {
    return (
      <div>
        <h1>Add a Link</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="linkName">
            <Col componentClass={ControlLabel} sm={2}>
              Name:
            </Col>
            <Col sm={10}>
              <FormControl
                name="linkName"
                componentClass="input"
                onChange={this.onLinkNameChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="linkURL">
            <Col componentClass={ControlLabel} sm={2}>
              URL:
            </Col>
            <Col sm={10}>
              <FormControl
                name="linkURL"
                componentClass="input"
                onChange={this.onLinkURLChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="linkType">
            <Col componentClass={ControlLabel} sm={2}>
              Type:
            </Col>
            <Col sm={10}>
              <FormControl
                name="linkType"
                componentClass="select"
                onChange={this.onLinkTypeChange}
              >
                {options}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={2}>
              <Button type="submit" bsStyle="primary">
                Submit
              </Button>
            </Col>
            <Col smOffset={2}>
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

AddSkillLinkForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddSkillLinkForm;
