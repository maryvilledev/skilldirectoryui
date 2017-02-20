import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

const client_id = (process.env.REACT_APP_GITHUB_CLIENT_ID);
const authURL = `https://github.com/login/oauth/authorize?scope=user:email%20read:org&client_id=${client_id}`;

const logOut = () => {
  cookie.save('isLoggedIn', false);
  cookie.remove('user_id');
  cookie.remove('name');
  cookie.remove('avatar_url');
  cookie.remove('github_token');
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
      <div>
        <img
          alt="Github Avatar"
          height={50}
          src={cookie.load("avatar_url")}
          width={50}
        />
        <span onClick={logOut}>
          Hello { cookie.load('name') || 'user' }! | Log out
        </span>
      </div>
    );
  }
  return (
    <div>
      <a
        style={{ color: 'white'}}
        href={authURL}
      >
        Sign in to Github
      </a>
    </div>
  )
};

export default LoginLink;
