import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

const api = process.env.REACT_APP_API;
const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
const requestURL = `${api}/users/`;

const Auth = ({ location: { query: { code } } }) => {
  const requestParams = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Request-Headers': 'Content-Type'
    },
    body: JSON.stringify({
      code,
      client_id
    }),
  };

  fetch(requestURL, requestParams)
    .then((response) => response.json())
    .then((data) => data.access_token)
    .then((access_token) => {
      // Make a request to Github for the user's profile info
      cookie.save("github_token", access_token);
      return fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `token ${access_token}`,
        }
      })
    })
    .then((response) => response.json())
    .then(({ avatar_url, id, name }) => {
      cookie.save("avatar_url", avatar_url);
      cookie.save("user_id", id);
      cookie.save("name", name);
      cookie.save("isLoggedIn", true);
    })
    .then(() => {
      browserHistory.push('/home');
    })
    .catch((err) => {
      console.log(err);
    })
  return null;
}

export default Auth;
