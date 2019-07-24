import { combineReducers } from 'redux';
import app from './app/reducer';
import user from './user/reducer';
import stash from './stash/reducer';
import yume from './yume/reducer';

const rootReducer = combineReducers({
  app,
  user,
  stash,
  yume,
});

export default rootReducer;
