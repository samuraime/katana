import { createActions } from 'redux-actions';
import { getUser } from '../../utils/API';

const actions = createActions({
  GET_USER: getUser,
});

export default actions;
