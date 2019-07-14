import update from 'immutability-helper';
import { handleActions } from 'redux-actions';
import { UPLOADING, DONE, ERROR } from '../../constants/upload';

const initialState = {
  archives: [],
  uploaderArchives: [],
};

const findIndexByTempKey = (state, key) =>
  state.uploaderArchives.findIndex(({ tempKey }) => tempKey === key);

const reducer = handleActions(
  {
    GET_ARCHIVES_SUCCESS(state, { payload }) {
      return {
        ...state,
        archives: payload,
      };
    },
    DELETE_ARCHIVE_SUCCESS(state, { payload }) {
      return {
        ...state,
        archives: state.archives.filter(({ id }) => id !== payload.id),
      };
    },
    APPEND_ARCHIVES(state, { payload }) {
      return {
        ...state,
        uploaderArchives: payload.concat(state.uploaderArchives),
      };
    },
    CREATE_ARCHIVE_PENDING(state, { meta }) {
      const index = findIndexByTempKey(state, meta.tempKey);
      return update(state, {
        uploaderArchives: {
          [index]: {
            $merge: {
              status: UPLOADING,
            },
          },
        },
      });
    },
    CREATE_ARCHIVE_SUCCESS(state, { payload, meta }) {
      const index = findIndexByTempKey(state, meta.tempKey);
      const uploadedArchive = {
        ...state.uploaderArchives[index],
        status: DONE,
        ...payload,
      };
      return update(state, {
        uploaderArchives: {
          [index]: {
            $set: uploadedArchive,
          },
        },
        archives: {
          $unshift: [uploadedArchive],
        },
      });
    },
    CREATE_ARCHIVE_FAILURE(state, { meta }) {
      const index = findIndexByTempKey(state, meta.tempKey);
      return update(state, {
        uploaderArchives: {
          [index]: {
            $merge: {
              status: ERROR,
            },
          },
        },
      });
    },
    UPDATE_ARCHIVE_PROGRESS(state, { payload }) {
      const index = findIndexByTempKey(state, payload.tempKey);
      return update(state, {
        uploaderArchives: {
          [index]: {
            $merge: payload,
          },
        },
      });
    },
  },
  initialState
);

export default reducer;
