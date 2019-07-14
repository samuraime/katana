import { createActions } from 'redux-actions';
import { getUser, signOut } from '../../utils/API';

const actions = createActions({
  GET_USER: getUser,
  SIGN_OUT: signOut,
});

export default actions;
