import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import { GlobalStyle } from './styles';
import * as serviceWorker from './serviceWorker';

function render() {
  ReactDOM.render(
    <Router>
      <GlobalStyle />
      <App store={store} />
    </Router>,
    document.getElementById('root')
  );
}

render();

if (module.hot) {
  module.hot.accept('./App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
