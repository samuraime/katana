import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middlewares/api';

const configureStore = (preloadedState, history) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    // apply router middleware for navigating
    routerMiddleware(history),
    // lets us dispatch() functions
    thunk,
    api,
  ),
);

export default configureStore;
