import update from 'immutability-helper';
import {
  ADD_ARCHIVES,
  UPDATE_ARCHIVE,
  REMOVE_ARCHIVE,
  POST_ARCHIVE_REQUEST,
  POST_ARCHIVE_SUCCESS,
  POST_ARCHIVE_FAILURE,
  DELETE_ARCHIVE_REQUEST,
  DELETE_ARCHIVE_SUCCESS,
  DELETE_ARCHIVE_FAILURE,
} from '../actions';
import { DONE } from '../containers/Upload';

const initialState = {
  archives: [],
  isFetching: false,
};

const upload = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARCHIVES: {
      return {
        ...state,
        archives: [...state.archives, ...action.archives],
      };
    }
    case UPDATE_ARCHIVE: {
      const index = state.archives.findIndex(({ key }) => action.key === key);
      return {
        ...state,
        archives: update(state.archives, {
          [index]: {
            $apply: a => ({ ...a, ...action.update }),
          },
        }),
      };
    }
    case REMOVE_ARCHIVE: {
      return {
        ...state,
        archives: state.archives.filter(({ key }) => key !== action.key),
      };
    }
    case POST_ARCHIVE_REQUEST:
    case DELETE_ARCHIVE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case POST_ARCHIVE_SUCCESS: {
      const index = state.archives.findIndex(({ hash }) => action.hash === hash);
      return {
        ...state,
        isFetching: false,
        archives: update(state.archives, {
          [index]: {
            id: { $set: action.response.id },
            status: { $set: DONE },
          },
        }),
      };
    }
    case DELETE_ARCHIVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        archives: state.archives.filter(({ id }) => id !== action.id),
      };
    case POST_ARCHIVE_FAILURE:
    case DELETE_ARCHIVE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default upload;
