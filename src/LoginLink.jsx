import React from 'react';
import cookie from 'react-cookie';
import { browserHistory, Link } from 'react-router';


const LoginLink = () => {
  if (cookie.load('isLoggedIn') === 'true') {
    return (
      <span
        onClick={() => {
          cookie.save('isLoggedIn', false);
          browserHistory.push('/home');
        }}
      >
        Log out
      </span>
    );
  }
  return (
    <Link to="/login">Log In</Link>
  )
};

export default LoginLink;
