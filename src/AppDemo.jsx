import React from 'react';
import { browserHistory, IndexRedirect, Route, Router } from 'react-router';

import Home from './Home';
import Skills from './SkillsUIDemo';
import Header from './Header';
import Team from './Team';
import Login from './Login.jsx'

function App() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <IndexRedirect to="/home" />
        <Route path="home" component={Home} />
        <Route path="skills(/:id)" component={SkillsUIDemo} />
        <Route path="team(/:id)" component={Team} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  );
}

export default App;
