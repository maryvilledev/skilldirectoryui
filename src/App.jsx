import React from 'react';
import {
  browserHistory,
  IndexRedirect,
  Route,
  Router
} from 'react-router';

import Auth from './Auth';
import Home from './Home';
import Skills from './Skills';
import Header from './Header';
import Team from './Team';

function App() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <IndexRedirect to="/home" />
        <Route path="home" component={Home} />
        <Route path="skills(/:id)" component={Skills} />
        <Route path="team(/:id)" component={Team} />
        <Route path="auth" component={Auth} />
      </Route>
    </Router>
  );
}

export default App;
