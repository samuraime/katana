/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware } from 'redux';
import promiseStateMiddleware from './promiseStateMiddleware';
import rootReducer from './reducer';

const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(promiseStateMiddleware())
);

export default store;
