import React from 'react';
import cookie from 'react-cookie';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import gitIcon from '../resources/github-icon.png';

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
    const title = (
      <span>
        <img
          alt='Github Avatar'
          src={cookie.load('avatar_url')}
          width='35'
          style={{ paddingRight: '10px' }}
        />
        <b style={{ paddingRight: '5px' }}>{cookie.load('name')}</b>
      </span>
    );
    return (
      <DropdownButton 
        bsStyle='default' 
        title={title}  
        style={{ padding: '5px' }}
      >
        <MenuItem onClick={logOut}> Log out</MenuItem>
      </DropdownButton>
    );
  }
  return (
      <Button
        onClick={ () => window.location = authURL }
        bsStyle='default'
        bsSize='small' 
      >
        <img 
          role='presentation'
          src={gitIcon} 
          width='28' 
          style={{ paddingRight: '8%'}} />
        <b>Login with Github</b>
      </Button>
  )
};

export default LoginLink;
