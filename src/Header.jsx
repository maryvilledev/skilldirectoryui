import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';

import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';


const Header = ({ children }) => (
  <Grid>
    <Navbar bsStyle="default"  fluid="false">
      <Navbar.Header>

        <Navbar.Brand>
          <Link to="/">Skill Directory</Link>
        </Navbar.Brand>
        <Nav>
          <NavItem eventKey={1}>
            <Link to="skills">Skills</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="team">Team</Link>
          </NavItem>
        </Nav>
      </Navbar.Header>

        <Nav pullRight>
          <NavItem  eventKey={3} disabled >Log in</NavItem>
        </Nav>

      </Navbar>
    {children}
  </Grid>
      );


export default Header;
