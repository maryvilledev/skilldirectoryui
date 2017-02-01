import React from 'react';
import cookie from 'react-cookie';

const WithLogin = ({children}) => (
  <span>
    { cookie.load('isLoggedIn') === 'true' ? children : null }
  </span>
);

WithLogin.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default WithLogin;
