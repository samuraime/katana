import { handleActions } from 'redux-actions';

const initialState = {
  signedIn: false,
  id: '',
  avatar: '',
  email: '',
  name: '',
};

const reducer = handleActions(
  {
    GET_USER_SUCCESS(state, action) {
      return {
        ...state,
        ...action.payload,
        signedIn: true,
      };
    },
    GET_USER_FAILURE(state, action) {
      return {
        ...state,
        ...action.payload,
        signedIn: false,
      };
    },
  },
  initialState
);

export default reducer;
