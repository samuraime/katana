import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { object } from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import AuthRoute from './components/AuthRoute';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Playground from './pages/Playground';
import Stash from './pages/Stash';
import Yume from './pages/Yume';
import NotFound from './pages/NotFound';
import theme from './styles/theme';
import messages from './locales/zh-CN';

function AppLayoutPage() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/stash" element={<Stash />} />
        <Route path="/yume" element={<AuthRoute component={Yume} />} />
        <Route element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

function App({ store }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="zh-CN" messages={messages}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/*" element={<AppLayoutPage />} />
          </Routes>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  );
}

App.propTypes = {
  store: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
