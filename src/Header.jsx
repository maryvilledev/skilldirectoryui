import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const api = (process.env.REACT_APP_API);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentWillMount() {
    // login & password are both "test"
    const login = prompt("Login:");
    const password = prompt("Password:");

    axios.post(`${api}/users/`, {
      login,
      password
    })
    .then(() => {
      this.setState({
        isLoggedIn: true,
      })
    })
    .catch(() => {
      this.setState({
        isLoggedIn: false,
      });
    });
  }
  render() {
    if (this.state.isLoggedIn) {
      return (
        <Grid fluid={true}>
          <Navbar bsStyle="default" fluid={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Skill Directory</Link>
              </Navbar.Brand>
            </Navbar.Header>
            {
            //Make sure all these paths are absolute (starting with a '/') so the
            //route will be handled properly
            }
              <Nav>
                <NavItem eventKey={1}>
                  <Link to="/skills">Skills</Link>
                </NavItem>
                <NavItem eventKey={2}>
                  <Link to="/team">Team</Link>
                </NavItem>
              </Nav>
            <Nav pullRight>
              <NavItem  eventKey={3} disabled >Log in</NavItem>
            </Nav>
            </Navbar>
          {this.props.children}
        </Grid>
      );
    }
    return (
      <h1>Please login</h1>
    );
  }
}
export default Header;
