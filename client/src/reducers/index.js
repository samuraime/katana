import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './home';

const rootReducer = combineReducers({
  home,
  // Add the reducer to your store on the `router` key
  router: routerReducer,
});
export default rootReducer;
