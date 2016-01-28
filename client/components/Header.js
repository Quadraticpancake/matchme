import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

import { styles } from './styles.scss';
export class Header extends Component {
  render() {
    return (
      <header className={`${styles}`} >
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      </header>
    );
  }
}
