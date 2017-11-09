import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import home from './home';
import upload from './upload';

const rootReducer = combineReducers({
  auth,
  home,
  upload,
  // Add the reducer to your store on the `router` key
  router: routerReducer,
});
export default rootReducer;
