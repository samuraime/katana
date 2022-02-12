import { createActions } from 'redux-actions';
import { getArchives, postArchive, deleteArchive } from '../../utils/API';
import uploadFile from './uploadFile';
import getUploadArchive, { getTempId } from './getUploadArchive';

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
    (uploadPromise, archive) => archive,
  ],
  DELETE_ARCHIVE: deleteArchive,
  UPDATE_ARCHIVE_PROGRESS: null,
});

const appendNewArchives = (newFiles) => (dispatch, getState) => {
  const currentArchives = getState().stash.archives;
  const filteredFiles = newFiles.filter(
    (file) => !currentArchives.find((a) => a.id === getTempId(file))
  );
  const newArchives = filteredFiles.map(getUploadArchive);

  dispatch(actions.appendArchives(newArchives));

  newArchives.forEach((archive, index) => {
    const promise = uploadFile(filteredFiles[index], {
      onProgress(uploaded) {
        dispatch(
          actions.updateArchiveProgress({
            id: archive.id,
            uploaded,
          })
        );
      },
    });

    dispatch(actions.createArchive(promise, archive)).catch(() => {
      // swallow
    });
  });
};

const combinedActions = {
  ...actions,
  appendNewArchives,
};

export default combinedActions;
