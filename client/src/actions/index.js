import { CALL_API } from '../middlewares/api';

export const COMMON_REQEST_FAILURE = 'COMMON_REQEST_FAILURE';

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE';

export const postLogin = (email, password) => ({
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

export const POST_AUTO_LOGIN_REQUEST = 'POST_AUTO_LOGIN_REQUEST';
export const POST_AUTO_LOGIN_SUCCESS = 'POST_AUTO_LOGIN_SUCCESS';
export const POST_AUTO_LOGIN_FAILURE = 'POST_AUTO_LOGIN_FAILURE';

export const postAutoLogin = () => ({
  [CALL_API]: {
    types: [POST_AUTO_LOGIN_REQUEST, POST_AUTO_LOGIN_SUCCESS, POST_AUTO_LOGIN_FAILURE],
    endpoint: '/autologin',
    method: 'POST',
  },
});

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_FAILURE = 'POST_LOGOUT_FAILURE';

const postLogout = () => ({
  [CALL_API]: {
    types: [POST_LOGOUT_REQUEST, POST_LOGOUT_SUCCESS, POST_LOGOUT_FAILURE],
    endpoint: '/logout',
    method: 'POST',
  },
});

export const deleteLogin = () => (dispatch) => {
  dispatch(postLogout());
};

export const ADD_ARCHIVES = 'ADD_ARCHIVES';
export const addArchives = archives => ({
  type: ADD_ARCHIVES,
  archives,
});

export const UPDATE_ARCHIVE = 'UPDATE_ARCHIVE';
export const updateArchive = (key, update) => ({
  type: UPDATE_ARCHIVE,
  key,
  update,
});

export const REMOVE_ARCHIVE = 'REMOVE_ARCHIVE';
export const removeArchive = key => ({
  type: REMOVE_ARCHIVE,
  key,
});

export const GET_ARCHIVES_REQUEST = 'GET_ARCHIVES_REQUEST';
export const GET_ARCHIVES_SUCCESS = 'GET_ARCHIVES_SUCCESS';
export const GET_ARCHIVES_FAILURE = 'GET_ARCHIVES_FAILURE';

export const getArchives = () => ({
  [CALL_API]: {
    types: [GET_ARCHIVES_REQUEST, GET_ARCHIVES_SUCCESS, GET_ARCHIVES_FAILURE],
    endpoint: '/archives',
  },
});

export const POST_ARCHIVE_REQUEST = 'POST_ARCHIVE_REQUEST';
export const POST_ARCHIVE_SUCCESS = 'POST_ARCHIVE_SUCCESS';
export const POST_ARCHIVE_FAILURE = 'POST_ARCHIVE_FAILURE';

export const postArchive = (archive, key) => ({
  [CALL_API]: {
    types: [POST_ARCHIVE_REQUEST, POST_ARCHIVE_SUCCESS, POST_ARCHIVE_FAILURE],
    endpoint: '/archives',
    method: 'POST',
    body: archive,
  },
  key,
});

export const PUT_ARCHIVE_REQUEST = 'PUT_ARCHIVE_REQUEST';
export const PUT_ARCHIVE_SUCCESS = 'PUT_ARCHIVE_SUCCESS';
export const PUT_ARCHIVE_FAILURE = 'PUT_ARCHIVE_FAILURE';

export const putArchive = archive => ({
  [CALL_API]: {
    types: [PUT_ARCHIVE_REQUEST, PUT_ARCHIVE_SUCCESS, PUT_ARCHIVE_FAILURE],
    endpoint: '/archives',
    method: 'PUT',
    body: archive,
  },
});

export const DELETE_ARCHIVE_REQUEST = 'DELETE_ARCHIVE_REQUEST';
export const DELETE_ARCHIVE_SUCCESS = 'DELETE_ARCHIVE_SUCCESS';
export const DELETE_ARCHIVE_FAILURE = 'DELETE_ARCHIVE_FAILURE';

export const deleteArchive = id => ({
  [CALL_API]: {
    types: [DELETE_ARCHIVE_REQUEST, DELETE_ARCHIVE_SUCCESS, DELETE_ARCHIVE_FAILURE],
    endpoint: `/archives/${id}`,
    method: 'DELETE',
  },
  id,
});
