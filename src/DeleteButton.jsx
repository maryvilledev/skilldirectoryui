import Button from 'react-bootstrap/lib/Button';
import React, { PropTypes } from 'react';

const DeleteButton = ({name, onClick}) => (
  <Button
    name={name}
    bsStyle='danger'
    onClick={onClick}
    children='Delete'
  />
);

DeleteButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
