import { combineReducers } from 'redux';
import app from './app';
import account from './account';

const rootReducer = combineReducers({
  app,
  account,
});

export default rootReducer;
