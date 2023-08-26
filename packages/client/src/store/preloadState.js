/* eslint-disable no-underscore-dangle */

import userActions from './user/actions';

const preloadedState = window.__PRELOADED_STATE__ || {};

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

function preloadState(store) {
  store.dispatch(userActions.init(preloadedState.user));
}

export default preloadState;
