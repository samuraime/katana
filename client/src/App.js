import React from 'react';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import configureStore from './store/configureStore';
import Home from './containers/Home';
import Upload from './containers/Upload';
import About from './containers/About';
import Header from './components/Header';
import Footer from './components/Footer';
import { postAutoLogin } from './actions';
import { getAuthToken } from './services/storage';
// import asyncComponent from './utils/async-component';
import './styles/global.scss';
import s from './App.scss';

// const Upload = asyncComponent(() => System.import(/* webpackChunkName: "new" */'./containers/Upload'));
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
      <div className={s.root}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/about" component={About} />
          <Route component={Home} />
        </Switch>
        <Footer />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
