import { CALL_API } from '../middlewares/api';

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE';

const postLoginAction = (email, password) => ({
  [CALL_API]: {
    types: [POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_FAILURE],
    endpoint: '/login',
    method: 'POST',
    body: {
      email,
      password,
    },
  },
});

export const postLogin = (email, password) => (dispatch) => {
  dispatch(postLoginAction(email, password));
};

export const POST_AUTO_LOGIN_REQUEST = 'POST_AUTO_LOGIN_REQUEST';
export const POST_AUTO_LOGIN_SUCCESS = 'POST_AUTO_LOGIN_SUCCESS';
export const POST_AUTO_LOGIN_FAILURE = 'POST_AUTO_LOGIN_FAILURE';

const postAutoLoginAction = () => ({
  [CALL_API]: {
    types: [POST_AUTO_LOGIN_REQUEST, POST_AUTO_LOGIN_SUCCESS, POST_AUTO_LOGIN_FAILURE],
    endpoint: '/autologin',
    method: 'POST',
  },
});

export const postAutoLogin = () => (dispatch) => {
  dispatch(postAutoLoginAction());
};

export const DELETE_LOGIN_REQUEST = 'DELETE_LOGIN_REQUEST';
export const DELETE_LOGIN_SUCCESS = 'DELETE_LOGIN_SUCCESS';
export const DELETE_LOGIN_FAILURE = 'DELETE_LOGIN_FAILURE';

const deleteLoginAction = () => ({
  [CALL_API]: {
    types: [DELETE_LOGIN_REQUEST, DELETE_LOGIN_SUCCESS, DELETE_LOGIN_FAILURE],
    endpoint: '/login',
    method: 'DELETE',
  },
});

export const deleteLogin = () => (dispatch) => {
  dispatch(deleteLoginAction());
};

export const GET_BOOKMARKS_REQUEST = 'GET_BOOKMARKS_REQUEST';
export const GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS';
export const GET_BOOKMARKS_FAILURE = 'GET_BOOKMARKS_FAILURE';

const getBookmarksAction = () => ({
  [CALL_API]: {
    types: [GET_BOOKMARKS_REQUEST, GET_BOOKMARKS_SUCCESS, GET_BOOKMARKS_FAILURE],
    endpoint: '/bookmarks',
  },
});

export const getBookmarks = () => (dispatch) => {
  dispatch(getBookmarksAction());
};

export const POST_BOOKMARK_REQUEST = 'POST_BOOKMARK_REQUEST';
export const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
export const POST_BOOKMARK_FAILURE = 'POST_BOOKMARK_FAILURE';

const postBookmarkAction = link => ({
  [CALL_API]: {
    types: [POST_BOOKMARK_REQUEST, POST_BOOKMARK_SUCCESS, POST_BOOKMARK_FAILURE],
    endpoint: '/bookmarks',
    method: 'POST',
    body: { link },
  },
});

export const postBookmark = link => (dispatch) => {
  dispatch(postBookmarkAction(link));
};

export const DELETE_BOOKMARK_REQUEST = 'DELETE_BOOKMARK_REQUEST';
export const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS';
export const DELETE_BOOKMARK_FAILURE = 'DELETE_BOOKMARK_FAILURE';

const deleteBookmarkAction = id => ({
  [CALL_API]: {
    types: [DELETE_BOOKMARK_REQUEST, DELETE_BOOKMARK_SUCCESS, DELETE_BOOKMARK_FAILURE],
    endpoint: `/bookmarks/${id}`,
    method: 'DELETE',
  },
  id,
});

export const deleteBookmark = id => (dispatch) => {
  dispatch(deleteBookmarkAction(id));
};
