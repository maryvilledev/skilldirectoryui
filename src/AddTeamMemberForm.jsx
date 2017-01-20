import React, { PropTypes } from 'react';

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
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="teamMemberName">
            Name:
          </label>
          <input
            id="teamMemberName"
            type="text"
            value={this.state.teamMemberName}
            onChange={this.onNameChange}
          />
        </div>
        <div>
          <label htmlFor="teamMemberTitle">
            Title:
          </label>
          <input
            id="teamMemberTitle"
            type="text"
            value={this.state.teamMemberTitle}
            onChange={this.onTitleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    );
  }
}

AddTeamMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddTeamMemberForm;
