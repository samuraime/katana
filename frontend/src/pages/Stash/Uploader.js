import React from 'react';
import classnames from 'classnames';
import Octicon, { CloudUpload } from '@primer/octicons-react';
import Surface from '../../components/Surface';
import FilePicker from '../../components/FilePicker';
import stashActions from '../../store/stash/actions';
import { string, func, arrayOf, Archive } from '../../types';
import s from './Uploader.module.scss';

function Uploader({ className, archives, dispatch, ...otherProps }) {
  const handleChange = (e, files) => {
    dispatch(stashActions.appendNewArchives(files));
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
