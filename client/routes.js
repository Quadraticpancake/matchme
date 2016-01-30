import React from 'react';
import { Route } from 'react-router';

/* containers */
import App from './containers/App';
import Home from './containers/Home';
import Profile from './containers/Profile.js';
import Chats from './containers/Chats';

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home} />
    <Route path="profile" component={Profile} />
    <Route path="chats" component={Chats} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
