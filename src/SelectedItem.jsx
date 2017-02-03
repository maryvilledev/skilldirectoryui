import React, { PropTypes } from 'react';

import DeleteButton from './DeleteButton.jsx';
import WithLogin from './WithLogin.jsx';

const ItemDisplayer = ({children, deleteCallback, typeName}) => (
  <div>
    {children}
    <WithLogin>
      <DeleteButton
        name={`Delete${typeName}`}
        onClick={deleteCallback}
      />
    </WithLogin>
  </div>
);

ItemDisplayer.propTypes = {
  deleteCallback: PropTypes.func.isRequired,
  typeName: PropTypes.string,
};

export default ItemDisplayer;
