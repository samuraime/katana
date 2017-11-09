import {
  POST_AUTO_LOGIN_SUCCESS,
  POST_AUTO_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
  POST_LOGOUT_SUCCESS,
} from '../actions';

const initialState = {
  email: '',
  token: '',
  logged: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case POST_AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
        token: action.response.token,
        email: action.response.email,
      };
    case POST_AUTO_LOGIN_FAILURE:
      return {
        ...state,
        token: '',
        email: action.email,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
        token: action.response.token,
        email: action.email,
      };
    case POST_LOGOUT_SUCCESS:
      return {
        ...state,
        logged: false,
        token: '',
      };
    default:
      return state;
  }
};

export default auth;
