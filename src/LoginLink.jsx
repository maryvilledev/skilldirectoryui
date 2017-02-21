import React from 'react';
import cookie from 'react-cookie';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
<<<<<<< HEAD
import gitIcon from '../resources/GitHub-Mark-64px.png';
=======
import gitIcon from '../resources/Octocat.png';
>>>>>>> d3d4eb7705154296fc907a04aec9823d91b081a3

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
    const userIcon = (
      <img
        alt="Github Avatar"
        src={cookie.load("avatar_url")}
        width='25'
        style={{ paddingRight: '20%' }}
      />
    );
    return (
      <DropdownButton bsStyle='default' title={userIcon} >
        <MenuItem onClick={logOut}> Log out</MenuItem>
      </DropdownButton>
    );
  }
  return (
<<<<<<< HEAD
      <Button
        onClick={ () => window.location = authURL }
        bsStyle='default'
        bsSize='small' >
      <img
        style={{ paddingRight: '8%'}}
      />
    Login with Github
      </Button>


  )
};

export default LoginLink;
