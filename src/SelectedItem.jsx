import DeleteButton from './DeleteButton.jsx';
import React, { PropTypes } from 'react';

const ItemDisplayer = ({children, deleteCallback, typeName}) => (
  <div>
    {children}
    <DeleteButton
      name={`Delete${typeName}`}
      onClick={deleteCallback}
    />
  </div>
);

ItemDisplayer.propTypes = {
  deleteCallback: PropTypes.func.isRequired,
  typeName: PropTypes.string,
};

export default ItemDisplayer;
