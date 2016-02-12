import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import App from './containers/App';
import Home from './containers/Home';
import MultiplayerHome from './containers/MultiplayerHome';
import Profile from './containers/Profile.js';
import Chats from './containers/Chats.js';
import Score from './containers/UserScore.js';
import ProfilePicture from './containers/ProfilePicture.js';
import Recommendation from './containers/Recommendation.js';
import Landing from './containers/Landing.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home} />
    <Route path="landing" component={Landing} />
    <Route path="multiplayerHome" component={MultiplayerHome} />
    <Route path="profile" component={Profile} />
    <Route path="chats" component={Chats} />
    <Route path="score" component={Score} />
    <Route path="pictures" component={ProfilePicture}/>
    <Route path="recommendation" component={Recommendation}/>
    <Route status={404} path="*" component={Home} />
  </Route>
);
