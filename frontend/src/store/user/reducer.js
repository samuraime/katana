import { handleActions } from 'redux-actions';

const initialState = {
  id: '',
  avatar: '',
  email: '',
  name: '',
  signedIn: false,
  superUser: false,
};

const reducer = handleActions(
  {
    INIT(state, { payload }) {
      return {
        ...state,
        ...payload,
        signedIn: !!payload && !!payload.id,
      };
    },
    GET_USER_SUCCESS(state, { payload }) {
      return {
        ...state,
        ...payload,
        signedIn: !!payload.id,
      };
    },
    GET_USER_FAILURE(state, { payload }) {
      return {
        ...state,
        ...payload,
        signedIn: false,
      };
    },
    SIGN_OUT_SUCCESS() {
      return initialState;
    },
  },
  initialState
);

export default reducer;
