import update from 'immutability-helper';
import { handleActions } from 'redux-actions';

const initialState = {
  yumes: [],
};

const reducer = handleActions(
  {
    GET_YUMES_SUCCESS(state, { payload }) {
      return {
        ...state,
        yumes: payload,
      };
    },
    CREATE_YUME_SUCCESS(state, { payload }) {
      return update(state, {
        yumes: {
          $unshift: [payload],
        },
      });
    },
    UPDATE_YUME_SUCCESS(state, { payload }) {
      const index = state.yumes.findIndex(({ id }) => id === payload.id);
      return {
        ...state,
        yumes: {
          [index]: {
            $merge: payload,
          },
        },
      };
    },
    DELETE_YUME_SUCCESS(state, { payload }) {
      return {
        ...state,
        yumes: state.yumes.filter(({ id }) => id !== payload.id),
      };
    },
  },
  initialState
);

export default reducer;