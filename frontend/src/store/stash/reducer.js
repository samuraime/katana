import update from 'immutability-helper';
import { handleActions } from 'redux-actions';
import { UPLOADING, DONE, ERROR } from '../../constants/upload';

const initialState = {
  archives: [],
};

const findIndexById = (state, targetId) =>
  state.archives.findIndex(({ id }) => id === targetId);

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
        archives: payload.concat(state.archives),
      };
    },
    CREATE_ARCHIVE_PENDING(state, { meta }) {
      const index = findIndexById(state, meta.id);
      return update(state, {
        archives: {
          [index]: {
            $merge: {
              status: UPLOADING,
            },
          },
        },
      });
    },
    CREATE_ARCHIVE_SUCCESS(state, { payload, meta }) {
      const index = findIndexById(state, meta.id);
      const uploadedArchive = {
        ...state.archives[index],
        status: DONE,
        ...payload,
      };
      return update(state, {
        archives: {
          [index]: {
            $set: uploadedArchive,
          },
        },
      });
    },
    CREATE_ARCHIVE_FAILURE(state, { meta }) {
      const index = findIndexById(state, meta.id);
      return update(state, {
        archives: {
          [index]: {
            $merge: {
              status: ERROR,
            },
          },
        },
      });
    },
    UPDATE_ARCHIVE_PROGRESS(state, { payload }) {
      const index = findIndexById(state, payload.id);
      return update(state, {
        archives: {
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
