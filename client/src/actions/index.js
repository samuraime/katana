import { CALL_API } from '../middlewares/api';

export const GET_BOOKMARKS_REQUEST = 'GET_BOOKMARKS_REQUEST';
export const GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS';
export const GET_BOOKMARKS_FAILURE = 'GET_BOOKMARKS_FAILURE';

const getBookmarksAction = () => ({
  [CALL_API]: {
    types: [GET_BOOKMARKS_REQUEST, GET_BOOKMARKS_SUCCESS, GET_BOOKMARKS_FAILURE],
    endpoint: 'bookmarks',
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
    endpoint: 'bookmarks',
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
    endpoint: `bookmarks/${id}`,
    method: 'DELETE',
  },
  id,
});

export const deleteBookmark = id => (dispatch) => {
  dispatch(deleteBookmarkAction(id));
};
