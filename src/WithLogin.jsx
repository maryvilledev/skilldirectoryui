import React from 'react';
import cookie from 'react-cookie';

// When we test in Jest, cookieValue will be set to Boolean true,
// whereas in the browser, cookieValue will be set to the string 'true',
// so we test for both in this function
const isLoggedIn = () => {
  const cookieValue = cookie.load('isLoggedIn');
  return cookieValue === true || cookieValue === 'true';
}

// Display the children if the user is logged in; else do not.
const WithLogin = ({children}) => (
  <span>
    { isLoggedIn() ? children : null }
  </span>
);

WithLogin.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default WithLogin;
