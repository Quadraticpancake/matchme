import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import css from './Header.scss';

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.

class Header extends Component {

  render() {
    const { user } = this.props;
    return (
      <Navbar staticTop pullLeft className={css.header} bsStyle="default">
        <Navbar.Header style={{ position: 'absolute' }}>
          <Navbar.Brand>
             <Link to="/landing">
              <div className={css.brand}></div>
            </Link>
          </Navbar.Brand>
          <Link to="/home">
            <span style={{
              color: 'rgb(168, 225, 238)',
              fontFamily: 'Lobster',
              fontWeight: '500',
              fontSize: 'xx-large',
              marginTop: '-10',
              marginRight: 20 }}
            >
            MatchMe
            </span>
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse eventKey={0}>
          <Nav navbar style={{ color: '#601848' }}>
            {user.isAuthenticated &&
            <LinkContainer to="/chats">
              <NavItem eventKey={1}>Chats</NavItem>
            </LinkContainer>}
            {user.isAuthenticated &&
            <LinkContainer to="/profile">
              <NavItem eventKey={2}>Profile</NavItem>
            </LinkContainer>}
            {user.isAuthenticated &&
            <LinkContainer to="/score">
              <NavItem eventKey={3}>Results</NavItem>
            </LinkContainer>}
            {user.isAuthenticated &&
            <LinkContainer to="/recommendation">
              <NavItem eventKey={5}>Recommended Match</NavItem>
            </LinkContainer>}
            {user.isAuthenticated &&
            <LinkContainer to="/multiplayerHome">
              <NavItem eventKey={5}>Multiplayer</NavItem>
            </LinkContainer>}
            {!user.isAuthenticated &&
            <NavItem
              className={css.loginlogoutdesktop}
              eventKey={3}
              onClick={this.props.actions.clickLogin}
            >
              Login via Facebook
            </NavItem>}
            {user.isAuthenticated &&
            <NavItem
              className={css.loginlogoutdesktop}
              eventKey={3}
              onClick={this.props.actions.logout}
            >
              Logout
            </NavItem>}
            {user.isAuthenticated &&
            <NavItem >Logged in as <strong>{user.userInfo.first_name}</strong></NavItem>}
            {user.isAuthenticated &&
            <NavItem >Points: <strong>{user.userScore.score}</strong></NavItem>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Header;
