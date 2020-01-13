import React from 'react';
import List from '../../components/List';
import { arrayOf, Archive } from '../../types';
import UploaderItem from './UploaderItem';

export default function UploaderList({ files, ...otherProps }) {
  if (!files.length) {
    return null;
  }

  return (
    <List {...otherProps}>
      {files.map(archive => (
        <UploaderItem
          key={archive.tempKey}
          archive={archive}
          // onRetry={}
        />
      ))}
    </List>
  );
}

UploaderList.propTypes = {
  files: arrayOf(Archive).isRequired,
};
