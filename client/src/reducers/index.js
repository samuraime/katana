import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './home';
import auth from './auth';

const rootReducer = combineReducers({
  home,
  auth,
  // Add the reducer to your store on the `router` key
  router: routerReducer,
});
export default rootReducer;
