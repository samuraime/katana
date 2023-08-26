import { handleActions } from 'redux-actions';

const initialState = {
  title: '',
};

const reducer = handleActions(
  {
    SET_TITLE(state, { payload }) {
      return {
        ...state,
        title: payload.title,
      };
    },
  },
  initialState
);

export default reducer;
