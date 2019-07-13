import { combineReducers } from 'redux';
import app from './app/reducer';
import user from './user/reducer';
import stash from './stash/reducer';

const rootReducer = combineReducers({
  app,
  user,
  stash,
});

export default rootReducer;
