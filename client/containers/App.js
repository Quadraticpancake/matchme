import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import * as AuthActions from '../actions/authentication';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { routeActions } from 'react-router-redux';

// expose socket for scoreboard and chats
export const socket = io();

/* global styles for app */
// import './styles/app.scss';

/* application components */
import Header from '../components/Header';
// import { Footer } from 'components/Footer';

class App extends Component {
  componentWillMount() {
    const { actions, routeActions } = this.props;
    function statusChangeCallback(response) {
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        const userID = response.authResponse.userID;
        const accessToken = response.authResponse.accessToken;
        actions.login(userID, accessToken);
        // routeActions.push('/profile');
        // testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        // document.getElementById('status').innerHTML = 'Please log ' +
        //   'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        // document.getElementById('status').innerHTML = 'Please log ' +
        //   'into Facebook.';
      }
    }

    window.fbAsyncInit = () => {
      FB.init({
        appId: '1640124032916803',
        cookie: true, // enable cookies to allow the server to access
        xfbml: true,  // parse social plugins on this page
        version: 'v2.2' // use version 2.2
      });

      FB.getLoginStatus((response) => {
        statusChangeCallback(response);
      });
    };
      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    window.AppProps = this.props;
    const { actions, user } = this.props;
    return (
      <section>
        <Header actions={actions} user={user}/>
        <div className="container-fluid">
          {this.props.children}
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
    actions: bindActionCreators(AuthActions, dispatch),
    routeActions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
