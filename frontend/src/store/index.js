import { createStore, applyMiddleware } from 'redux';
import promiseStateMiddleware from './promiseStateMiddleware';
import rootReducer from './reducer';
import preloadState from './preloadState';

const store = createStore(
  rootReducer,
  applyMiddleware(promiseStateMiddleware())
);

preloadState(store);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(rootReducer);
  });
}

export default store;
