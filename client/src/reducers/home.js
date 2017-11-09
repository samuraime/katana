import update from 'immutability-helper';
import {
  GET_ARCHIVES_REQUEST,
  GET_ARCHIVES_SUCCESS,
  GET_ARCHIVES_FAILURE,
  PUT_ARCHIVE_REQUEST,
  PUT_ARCHIVE_SUCCESS,
  PUT_ARCHIVE_FAILURE,
  DELETE_ARCHIVE_REQUEST,
  DELETE_ARCHIVE_SUCCESS,
  DELETE_ARCHIVE_FAILURE,
} from '../actions';

const initialState = {
  archives: [],
  isFetching: false,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARCHIVES_REQUEST:
    case PUT_ARCHIVE_REQUEST:
    case DELETE_ARCHIVE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ARCHIVES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        archives: [...state.archives, ...action.response],
      };
    case PUT_ARCHIVE_SUCCESS: {
      const index = state.archives.findIndex(({ id }) => action.id === id);
      return {
        ...state,
        isFetching: false,
        archives: update(state.archives, [
          [index]: {
            $set: action.response,
          },
        ]),
      };
    }
    case DELETE_ARCHIVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        archives: state.archives.filter(({ id }) => id !== action.id),
      };
    case GET_ARCHIVES_FAILURE:
    case PUT_ARCHIVE_FAILURE:
    case DELETE_ARCHIVE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default home;
