import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { object } from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import AuthRoute from './components/AuthRoute';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Playground from './pages/Playground';
import Stash from './pages/Stash';
import Yume from './pages/Yume';
import NotFound from './pages/NotFound';
import theme from './styles/theme';

function AppLayoutPage() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/blog" component={Blog} />
        <Route path="/stash" component={Stash} />
        <AuthRoute path="/yume" component={Yume} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App({ store }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/playground" component={Playground} />
          <Route component={AppLayoutPage} />
        </Switch>
      </Provider>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
