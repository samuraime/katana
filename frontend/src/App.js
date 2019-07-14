import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { object } from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import Home from './pages/Home';
import Playground from './pages/Playground';
import Stash from './pages/Stash';
import NotFound from './pages/NotFound';
import theme from './styles/theme';

function App({ store }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/playground" component={Playground} />
            <Route path="/stash" component={Stash} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
