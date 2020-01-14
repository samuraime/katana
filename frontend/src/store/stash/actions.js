import { createActions } from 'redux-actions';
import { getArchives, postArchive, deleteArchive } from '../../utils/API';

const actions = createActions({
  GET_ARCHIVES: getArchives,
  APPEND_ARCHIVES: null,
  CREATE_ARCHIVE: [
    (uploadPromise, archive) =>
      uploadPromise.then(({ key, hash }) =>
        postArchive({
          ...archive,
          key,
          hash,
        })
      ),
    (_, archive) => archive,
  ],
  DELETE_ARCHIVE: deleteArchive,
  UPDATE_ARCHIVE_PROGRESS: null,
});

export default actions;
