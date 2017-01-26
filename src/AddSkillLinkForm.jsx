import React from 'react';
import axios from 'axios';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, ControlLabel, Button,
   Form, FormControl, FormGroup } from 'react-bootstrap';

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
  if (inputs.linkType) {
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    // Error checking
    if (!validateInput(this.state)) {
      return;
    }
    // Post form data to API endpoint
    axios.post(`${this.props.api}/links/`, {
      name:      this.state.linkName,
      url:       this.state.linkUrl,
      skill_id:  this.props.skill_id,
      linkType: this.state.linkType
    })
    .then(() => {
      this.props.closeModal();
    })
    .catch((err) => {
      console.log(err)
    });
  }

  render() {
    const onLinkNameChange = ev => this.onChange('linkName', ev.target.value);
    const onLinkURLChange = ev => this.onChange('linkUrl', ev.target.value);
    const onLinkTypeChange = ev => this.onChange('linkType', ev.target.value);

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
                onChange={onLinkNameChange}
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
                onChange={onLinkURLChange}
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
                onChange={onLinkTypeChange}
              >
                <option key={null} value={null} />
                <option key="blog" value="blog">
                  Blog
                </option>
                <option key="tutorial" value="tutorial">
                  Tutorial
                </option>
                <option key="webpage" value="webpage">
                  Webpage
                </option>
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

export default AddSkillLinkForm;
