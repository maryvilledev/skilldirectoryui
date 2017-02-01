import React from 'react';
import cookie from 'react-cookie';

import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import axios from 'axios';

const api = (process.env.REACT_APP_API);

const validateInput = (input) => {
  if (!(input.login)) {
    return false;
  }
  if (!(input.password)) {
    return false;
  }
  return true;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: cookie.load('login') || '',
      password: cookie.load('password') || '',
      failedValidation: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key) {
    return (value) => {
      this.setState({
        [key]: value,
        failedValidation: false,
      });
    };
  }

  onLoginChange(ev) {
    this.onChange('login')(ev.target.value);
  }

  onPasswordChange(ev) {
    this.onChange('password')(ev.target.value);
  }

  onSubmit(ev) {
    ev.preventDefault();
    if (!validateInput(this.state)) {
      this.setState({
        failedValidation: true,
      })
      return;
    }
    axios.post(`${api}/users`, {
      login: this.state.login,
      password: this.state.password
    })
    .then((response) => {
      const { login, password } = response.data;
      cookie.save('login', login);
      cookie.save('password', password);
      cookie.save('isLoggedIn', true);
    })
    .then(() => {
      browserHistory.push('/home');
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        failedValidation: true,
      })
    })
  }

  render() {
    const failed = this.state.failedValidation;
    return (
      <div>
        <h1>Login</h1>
        <Form inline onSubmit={this.onSubmit}>
          <FormGroup
            controlId="loginField"
            validationState={ failed ? 'error' : null }
          >
            <ControlLabel>Login ID:</ControlLabel>
            {' '}
            <FormControl
              type="text"
              onChange={this.onLoginChange}
              value={this.state.login}
            />
          </FormGroup>
          <FormGroup
            validationState={ failed ? 'error' : null }
            controlId="passwordField"
          >
            <ControlLabel>Password:</ControlLabel>
            {' '}
            <FormControl
              type="password"
              onChange={this.onPasswordChange}
              value={this.state.password}
            />
          </FormGroup>
          <Button type="submit">
            Log In
          </Button>
        </Form>
        {
          failed ? <h4>Login credentials invalid. Please try again</h4> : null
        }
      </div>
    );
  }
}

export default Login;
