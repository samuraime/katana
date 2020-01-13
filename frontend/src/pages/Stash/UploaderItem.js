import React from 'react';
// import classnames from 'classnames';
import { ListItem } from '../../components/List';
import formatSize from './utils/formatSize';
import { Archive } from '../../types';
// import { UPLOADING, ERROR, DONE } from '../../constants/upload';
import s from './UploaderItem.module.scss';

export default function UploaderItem({ archive }) {
  const { name, size, uploaded } = archive;
  return (
    <ListItem className={s.root}>
      <div
        className={s.progress}
        style={{ width: `${(uploaded / size) * 100}%` }}
      />
      <div className={s.info}>
        <span>{name}</span>
        <span>
          <span>{formatSize(uploaded)}</span>
          <span> / </span>
          <span>{formatSize(size)}</span>
        </span>
      </div>
      {/* status === ERROR && <button type="button">retry</button> */}
    </ListItem>
  );
}

UploaderItem.propTypes = {
  archive: Archive.isRequired,
};
