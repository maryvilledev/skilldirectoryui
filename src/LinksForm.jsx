import React from 'react';
import axios from 'axios';
import 'react-select/dist/react-select.css';

var Select = require('react-select');

var linkTypes = [
  { value: 'blog', label: 'Blog' },
  { value: 'tutorial', label: 'Tutorial'},
  { value: 'webpage', label: 'Webpage' }
];

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
    const skill_id = this.props.skill_id;
    const link_name = this.state.link_name;
    const link_url = this.state.link_url;
    const link_type = this.state.link_type;

    // Check validity of URL before sending POST request
    if(!isValidURL(link_url)) {
      alert('Please enter a valid URL.');
      return;
    }

    // Post form data to API endpoint
    axios.post(this.props.api + '/links/', {
      name: link_name,
      url: link_url,
      skill_id: skill_id,
      link_type: link_type
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
    const onLinkNameChange = ev => this.onChange('link_name', ev.target.value);
    const onLinkURLChange = ev => this.onChange('link_url', ev.target.value);
    const onLinkTypeChange = ev => this.onChange('link_type', ev.value);
    return (
      <form onSubmit={ev => this.onSubmit(ev)}>
        <div>
          Name: <input name='link_name'
                       type='text'
                       value={this.state.link_name}
                       onChange={onLinkNameChange} />
        </div>
        <div>
          URL: <input name='link_url'
                      type='text'
                      value={this.state.link_url}
                      onChange={onLinkURLChange} />
        </div>
        <div>
          Type: <Select name='link_type'
                        value={this.state.link_type}
                        onChange={onLinkTypeChange}
                        options={linkTypes} />
        </div>
        <button type="submit">Save</button>
      </form>
    )
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
