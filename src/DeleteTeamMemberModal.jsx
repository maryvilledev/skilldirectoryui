import React, {PropTypes} from 'react'
import Button from 'react-bootstrap/lib/Button'

class DeleteTeamMemberModal extends React.Component {
  constructor(){
    super();
    this.confirm = this.confirm.bind(this);
  }
  render() {
    return (
      <div>
        <h1>Are you sure?</h1>
        <Button onClick={this.confirm} name="Yes">Yes</Button>
        <Button onClick={this.props.closeModal} name="No">No</Button>
      </div>
    );
  }
  confirm() {
    this.props.doDelete();
    this.props.closeModal();
  }
}

DeleteTeamMemberModal.propTypes = {
  doDelete: PropTypes.func,
  closeModal: PropTypes.func
}

export default DeleteTeamMemberModal;
