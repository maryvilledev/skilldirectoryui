import React from 'react';
import { browserHistory, IndexRedirect, Route, Router } from 'react-router';

import Home from './Home';
import Skills from './Skills';
import Header from './Header';
import Team from './Team';

function App(props) {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <IndexRedirect to="/home" />
        <Route path="home" component={Home} />
        <Route path="skills(/:id)" component={Skills} />
        <Route path="team" component={Team} />
      </Route>
    </Router>
  )
}

export default App