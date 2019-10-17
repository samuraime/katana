import { createStore, applyMiddleware } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import rootReducer from './reducer';
import preloadState from './preloadState';

const store = createStore(
  rootReducer,
  applyMiddleware(
    createPromise({
      promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE'],
    })
  )
);

preloadState(store);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(rootReducer);
  });
}

export default store;
