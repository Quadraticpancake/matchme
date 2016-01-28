import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import DevTools from './containers/DevTools'
import configureStore from './store/configureStore'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'

const store = configureStore()

render(
  <Provider store={store}>
    <div>
	  <Router history={browserHistory}>
	     <Route path="/" component={App}>
	     </Route>
	    </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)