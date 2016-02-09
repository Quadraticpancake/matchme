import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import configureStore from './store/configureStore';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import App from './containers/App';
import Home from './containers/Home';
import Chats from './containers/Chats';
import Score from './containers/UserScore';
import routes from './routes';

const store = configureStore();
//      <Redirect from="/" to="home" />
render(
  <Provider store={store}>
    <div>
    <Router history={browserHistory}>
      {routes}
    </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
