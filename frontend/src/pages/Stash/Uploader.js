import React from 'react';
import classnames from 'classnames';
import Octicon, { CloudUpload } from '@primer/octicons-react';
import Surface from '../../components/Surface';
import FilePicker from '../../components/FilePicker';
import stashActions from '../../store/stash/actions';
import { string, func, arrayOf, Archive } from '../../types';
import { uploadFile, getUploadArchive, getTempId } from './utils';
import s from './Uploader.module.scss';

const { appendArchives, createArchive, updateArchiveProgress } = stashActions;

const upload = (file, archive, dispatch) => {
  const promise = uploadFile(file, {
    onProgress: uploaded => {
      dispatch(
        updateArchiveProgress({
          id: archive.id,
          uploaded,
        })
      );
    },
  });

  dispatch(createArchive(promise, archive));
};

const uploadArchives = (archives, files, dispatch) => {
  files.forEach((file, index) => {
    upload(file, archives[index], dispatch);
  });
};

function Uploader({ className, archives, dispatch, ...otherProps }) {
  const handleChange = (e, files) => {
    const newFiles = Array.from(files).filter(
      file => !archives.find(a => a.id === getTempId(file))
    );
    const newArchives = newFiles.map(getUploadArchive);
    dispatch(appendArchives(newArchives));
    uploadArchives(newArchives, newFiles, dispatch);
  };

  return (
    <FilePicker
      className={classnames(s.root, className)}
      hoverClassName={s.dropZoneHover}
      elementType={Surface}
      onChange={handleChange}
      {...otherProps}
    >
      <Octicon icon={CloudUpload} size={100} />
      <p>Drop files here!</p>
    </FilePicker>
  );
}

Uploader.propTypes = {
  dispatch: func.isRequired,
  archives: arrayOf(Archive).isRequired,
  className: string,
};

Uploader.defaultProps = {
  className: '',
};

export default Uploader;
