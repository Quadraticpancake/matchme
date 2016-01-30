import React, { Component } from 'react';
import Scoreboard from './Scoreboard'

/* global styles for app */
// import './styles/app.scss';

/* application components */
import { Header } from '../components/Header';
// import { Footer } from 'components/Footer';
export default class App extends Component {

  render() {
    return (
      <section>
        <Header />
        {this.props.children}
         <div className="col-md-2 hidden-sm hidden-xs pull-right">
           <Scoreboard />
        </div>
      </section>
    );
  }
}
