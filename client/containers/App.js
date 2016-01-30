import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import * as AuthActions from '../actions/authentication';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* global styles for app */
// import './styles/app.scss';

/* application components */
import { Header } from '../components/Header';
// import { Footer } from 'components/Footer';
class App extends Component {

  render() {
    window.AppProps = this.props;
    const { actions } = this.props;
    return (
      <section>
        <Header actions={actions} />
        {this.props.children}
         <div className="col-md-2 hidden-sm hidden-xs pull-right">
           <Scoreboard />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);