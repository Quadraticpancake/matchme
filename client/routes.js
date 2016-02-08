import React from 'react';
import { Route } from 'react-router';

/* containers */
import App from './containers/App';
import Home from './containers/Home';
import Profile from './containers/Profile.js';
import Chats from './containers/Chats.js';
import Score from './containers/UserScore.js';
import ProfilePicture from './containers/ProfilePicture.js';
import Recommendation from './containers/Recommendation.js';

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home} />
    <Route path="profile" component={Profile} />
    <Route path="chats" component={Chats} />
    <Route path="score" component={Score} />
    <Route path="pictures" component={ProfilePicture}/>
    <Route path="recommendation" component={Recommendation}/>
    <Route status={404} path="*" component={Home} />
  </Route>
);
