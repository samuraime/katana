import {
  GET_BOOKMARKS_REQUEST,
  GET_BOOKMARKS_SUCCESS,
  GET_BOOKMARKS_FAILURE,
  POST_BOOKMARK_REQUEST,
  POST_BOOKMARK_SUCCESS,
  POST_BOOKMARK_FAILURE,
  DELETE_BOOKMARK_REQUEST,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAILURE,
} from '../actions';

const home = (state = {
  bookmarks: [],
  isFetching: false,
}, action) => {
  switch (action.type) {
    case GET_BOOKMARKS_REQUEST:
    case POST_BOOKMARK_REQUEST:
    case DELETE_BOOKMARK_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_BOOKMARKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookmarks: [...state.bookmarks, ...action.response],
      };
    case POST_BOOKMARK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookmarks: [...state.bookmarks, action.response],
      };
    case DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookmarks: state.bookmarks.filter(({ id }) => id !== action.id),
      };
    case GET_BOOKMARKS_FAILURE:
    case POST_BOOKMARK_FAILURE:
    case DELETE_BOOKMARK_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default home;
