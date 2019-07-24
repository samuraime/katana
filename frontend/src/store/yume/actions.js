import { createActions } from 'redux-actions';
import { getYumes, postYume, putYume, deleteYume } from '../../utils/API';

const actions = createActions({
  GET_YUMES: getYumes,
  CREATE_YUME: postYume,
  UPDATE_YUME: putYume,
  DELETE_YUME: deleteYume,
});

export default actions;
