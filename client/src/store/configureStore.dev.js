/* eslint global-require: 0 */

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middlewares/api';

// Build the middleware for intercepting and dispatching navigation actions
const router = routerMiddleware(history);

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      // apply router middleware for navigating
      router,
      // lets us dispatch() functions
      thunk,
      api,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
