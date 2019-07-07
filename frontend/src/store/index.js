import { createStore, applyMiddleware } from 'redux';
import promiseStateMiddleware from './promiseStateMiddleware';
import rootReducer from './reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(promiseStateMiddleware())
);

export default store;
