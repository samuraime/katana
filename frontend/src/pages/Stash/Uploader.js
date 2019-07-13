import React from 'react';
import { upload as uploadFile } from 'qiniu-up';
import Octicon, { CloudUpload } from '@primer/octicons-react';
import stashActions from '../../store/stash/actions';
import { getUploadToken } from '../../utils/API';
import { func, arrayOf, Archive } from '../../types';
import { READY } from '../../constants/upload';
import DnD from './DragAndDrop';
import UploaderItem from './UploaderItem';
import s from './Uploader.module.scss';

const { appendArchives, createArchive, updateArchiveProgress } = stashActions;

const fileTempKey = ({ size, name, lastModified }) =>
  `${name}-${size}-${lastModified}`;

const wrapFile = file => {
  const { size, name, type } = file;
  return {
    key: fileTempKey(file),
    name,
    size,
    type,
    uploaded: 0,
    status: READY,
    originalFile: file,
    hash: '',
  };
};

const upload = (archive, dispatch) => {
  const uploadPromise = uploadFile(archive.originalFile, {
    token: async () => {
      const { token } = await getUploadToken();
      return token;
    },
    onProgress: uploaded => {
      dispatch(
        updateArchiveProgress({
          key: archive.key,
          uploaded,
        })
      );
    },
  });
  const action = createArchive(uploadPromise, archive);
  dispatch(action);
};

const uploadArchives = (archives, dispatch) => {
  archives
    .filter(({ status }) => status === READY)
    .forEach(archive => {
      upload(archive, dispatch);
    });
};

function Uploader({ archives, dispatch, ...otherProps }) {
  const handleChange = (e, files) => {
    const newArchives = Array.from(files)
      .filter(file => !archives.find(a => a.key === fileTempKey(file)))
      .map(wrapFile);
    dispatch(appendArchives(newArchives));
    uploadArchives(newArchives, dispatch);
  };

  const handleRetry = archive => () => {
    upload(archive, dispatch);
  };

  return (
    <div {...otherProps}>
      <DnD
        className={s.dropZone}
        hoverClassName={s.dropZoneHover}
        onChange={handleChange}
      >
        <Octicon icon={CloudUpload} size={100} />
        <p>Drop your files here!</p>
      </DnD>
      {!!archives.length && (
        <div className={s.uploaderList}>
          {archives.map(archive => (
            <UploaderItem
              key={archive.key}
              archive={archive}
              onRetry={handleRetry(archive)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Uploader.propTypes = {
  dispatch: func.isRequired,
  archives: arrayOf(Archive).isRequired,
};

export default Uploader;
