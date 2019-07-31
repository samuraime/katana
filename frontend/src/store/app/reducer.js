import { handleActions } from 'redux-actions';

const initialState = {
  title: '',
  notifications: [],
};

const reducer = handleActions(
  {
    SET_TITLE(state, { payload }) {
      return {
        ...state,
        title: payload.title,
      };
    },
    ADD_NOTIFICATION(state, { payload }) {
      return {
        ...state,
        notifications: [...state.notifications, payload],
      };
    },
  },
  initialState
);

export default reducer;
