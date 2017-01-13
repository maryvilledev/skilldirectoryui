import React, { PropTypes } from 'react'

class AddTeamMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMemberName: "",
      teamMemberTitle: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(key) {
    // Return a curried function that sets a value to the key in this.state
    return function(value) {
      this.setState({
        [key]: value
      });
    }.bind(this);
  }
  onNameChange(ev) {
    this.onChange("teamMemberName")(ev.target.value);
  }
  onTitleChange(ev) {
    this.onChange("teamMemberTitle")(ev.target.value);
  }
  onSubmit() {
    const name = this.state.teamMemberName;
    const title = this.state.teamMemberTitle;
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
            onChange={this.onNameChange} />
        </div>
        <div>
          <label htmlFor="teamMemberTitle">
            Title:
          </label>
          <input
            id="teamMemberTitle"
            type="text"
            value={this.state.teamMemberTitle}
            onChange={this.onTitleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    );
  }
}

AddTeamMemberForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddTeamMemberForm;
