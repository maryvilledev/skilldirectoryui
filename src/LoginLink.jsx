import React from 'react';
import cookie from 'react-cookie';
import { browserHistory, Link } from 'react-router';

const logOut = () => {
  cookie.save('isLoggedIn', false);
  cookie.remove('display_name');
  browserHistory.push('/home');
}

// When we test in Jest, cookieValue will be set to Boolean true,
// whereas in the browser, cookieValue will be set to the string 'true',
// so we test for both in this function
const isLoggedIn = () => {
  const cookieValue = cookie.load('isLoggedIn');
  return cookieValue === true || cookieValue === 'true';
}

const LoginLink = () => {
  if (isLoggedIn()) {
    return (
      <span onClick={logOut}>
        Hello {cookie.load('display_name')}! | Log out
      </span>
    );
  }
  return (
    <Link to="/login">Log In</Link>
  )
};

export default LoginLink;
