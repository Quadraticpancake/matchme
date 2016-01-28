import React, { Component } from 'react';

/* global styles for app */
// import './styles/app.scss';

/* application components */
// import { Header } from 'components/Header';
// import { Footer } from 'components/Footer';
export default class App extends Component {

  render() {
    return (
      <section>
        INSERT HEADER HERE
        {this.props.children}
      </section>
    );
  }
}
