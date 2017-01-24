import React from 'react';
import axios from 'axios';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, ControlLabel, Button,
   Form, FormControl, FormGroup } from 'react-bootstrap'

class LinksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link_name: "",
      link_url: "",
      link_type: "",
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    // Error checking
    if(this.state.link_name === '') {
      alert('Please enter a Name.');
      return;
    }
    if(!isValidURL(this.state.link_url)) {
      alert('Please enter a valid URL.');
      return;
    }
    if(this.state.link_type === '') {
      alert('Please enter a Type.');
      return;
    }

    // Post form data to API endpoint
    axios.post(this.props.api + '/links/', {
      name:      this.state.link_name,
      url:       this.state.link_url,
      skill_id:  this.props.skill_id,
      link_type: this.state.link_type
    })
    .then(response => {
      this.props.closeModal();
    }).catch(err => console.log(`Caught an error ${err}`));
  }

  render() {
    const onLinkNameChange = ev => this.onChange('link_name', ev.target.value);
    const onLinkURLChange = ev => this.onChange('link_url', ev.target.value);
    const onLinkTypeChange = ev => this.onChange('link_type', ev.target.value);

    return (
      <div>
        <h1>Add a Link</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId='linkName'>
            <Col componentClass={ControlLabel} sm={2}>
              Name:
            </Col>
            <Col sm={10}>
              <FormControl
                name='linkName'
                componentClass='input'
                onChange={onLinkNameChange}/>
            </Col>
          </FormGroup>
          
          <FormGroup controlId='linkURL'>
            <Col componentClass={ControlLabel} sm={2}>
              URL:
            </Col>
            <Col sm={10}>
              <FormControl
                name='linkURL'
                componentClass='input'
                onChange={onLinkURLChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId='linkType'>
            <Col componentClass={ControlLabel} sm={2}>
              Type:
            </Col>
            <Col sm={10}>
              <FormControl
                name='linkType'
                componentClass='select'
                onChange={onLinkTypeChange}>
                <option key={null} value={null}/>
                <option key='blog' value='blog'>
                  Blog
                </option>
                <option key='tutorial' value='tutorial'>
                  Tutorial
                </option>
                <option key='webpage' value='webpage'>
                  Webpage
                </option>
              </FormControl>
            </Col>  
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={2}>
              <Button type='submit' bsStyle='primary'>
                Submit 
              </Button>
            </Col>
            <Col smOffset={2}>
              <Button  onClick={this.props.closeModal} bsStyle='info'>
                Cancel 
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

/* eslint-disable no-useless-escape */
/* http://stackoverflow.com/a/30970319 */
function isValidURL(url) {
    var res = url.match(/(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

export default LinksForm
module.exports.isValidURL = isValidURL
