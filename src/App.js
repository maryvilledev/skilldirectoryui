import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { hashHistory, IndexRedirect, Route, Router } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

import Skills from './Skills';
import Header from './Header'
import Team from './Team'

class Home extends Component {
  render() {
    return (
      <h1>Skill Directory Home</h1>
    );
  }
}

function App(props) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Header}>
        <IndexRedirect to="/home" />
        <Route path="home" component={Home} />
        <Route path="skills" component={Skills} />
        <Route path="team" component={Team} />
      </Route>
    </Router>
  );
}

export default App