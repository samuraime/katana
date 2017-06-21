import {
  POST_AUTO_LOGIN_SUCCESS,
  POST_AUTO_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
  DELETE_LOGIN_SUCCESS,
} from '../actions';

const auth = (state = {
  email: '',
  token: '',
  logged: false,
}, action) => {
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
    case DELETE_LOGIN_SUCCESS:
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
