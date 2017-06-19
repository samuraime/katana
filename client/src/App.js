import React from 'react';
import { Route, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import Index from './containers/Index';
import About from './containers/About';

const history = createHistory();
const store = configureStore();

const App = () => (
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={Index} />
        <Route path="/about" component={About} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
