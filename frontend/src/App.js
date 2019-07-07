import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { object } from 'prop-types';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Playground from './pages/Playground';
import NotFound from './pages/NotFound';
import s from './App.css';

function App({ store }) {
  return (
    <Provider store={store}>
      <Navigation className={s.navigation} />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/playground" component={Playground} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
