import React from 'react';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import configureStore from './store/configureStore';
import Index from './containers/Index';
import New from './containers/New';
import About from './containers/About';
import Header from './components/Header';
import { postAutoLogin } from './actions';
import { getAuthToken } from './services/storage';
// import asyncComponent from './utils/asyncComponent';

// const New = asyncComponent(() => System.import(/* webpackChunkName: "new" */'./containers/New'));
// const About = asyncComponent(() => System.import(/* webpackChunkName: "about" */'./containers/About'));

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const router = routerMiddleware(history);
const store = configureStore({}, { router });

// check local storage and login
const authToken = getAuthToken();
if (authToken) {
  store.dispatch(postAutoLogin());
}

const App = () => (
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/new" component={New} />
          <Route path="/about" component={About} />
          <Route component={Index} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
