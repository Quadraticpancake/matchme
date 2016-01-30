import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import css from './Header.scss';
import { clickLogin } from '../actions/authentication'

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.


const handleClick = function () {
  clickLogin();
  console.log('handleClick');
}

const handleLogin = function () {
  console.log('BAILEY B BAILEY');
}


export class Header extends Component {
  render() {
    return (
      <header className={css.header} >
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home" activeStyle={{color: '#33e0ff'}}>
              <div />
              <span>Home</span>
            </Link>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Collapse eventKey={0}>
          <Nav navbar>
            <LinkContainer to="/chats">
              <NavItem eventKey={1}>Chats</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavItem eventKey={1}>My Profile</NavItem>
            </LinkContainer>
          </Nav>
          <Nav navbar>
            <div onClick={handleClick}>
              FACEBOOK
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </header>
    );
  }
}
