import React, { PropTypes } from 'react'
import Button from 'react-bootstrap/lib/Button'

function DeleteModal(props) {
  function confirmDelete() {
    props.shouldDelete(true);
  }
  function rejectDelete() {
    props.shouldDelete(false);
  }
  return (
    <div>
      <h1>Are you sure?</h1>
      <Button onClick={confirmDelete} name="Yes">Yes</Button>
      <Button onClick={rejectDelete} name="No">No</Button>
    </div>
  );
}

DeleteModal.propTypes = {
  shouldDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
