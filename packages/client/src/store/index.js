import { createStore, applyMiddleware } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import preloadState from './preloadState';

export function createAppStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      createPromise({
        promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE'],
      }),
      thunk
    )
  );
}

const store = createAppStore();

preloadState(store);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(rootReducer);
  });
}

export default store;
