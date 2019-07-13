import React from 'react';
import Octicon, { Trashcan, CloudDownload } from '@primer/octicons-react';
import { func, arrayOf, Archive } from '../../types';
import getIcon from '../../utils/icon';
import formatSize from '../../utils/formatSize';
import s from './ArchiveList.module.scss';

export default function ArchiveList({ archives, onDelete, ...otherProps }) {
  return (
    <div {...otherProps}>
      {archives.map(archive => (
        <div key={archive.id} className={s.item}>
          <div className={s.archiveInfo}>
            <Octicon icon={getIcon(archive.name)} size={20} />
            <span>{archive.name}</span>
            <span>{formatSize(archive.size)}</span>
          </div>
          <div className={s.action}>
            <a
              href={archive.link}
              download={archive.name}
              className={s.download}
            >
              <Octicon icon={CloudDownload} size={20} />
            </a>
            <button
              type="button"
              className={s.delete}
              onClick={() => onDelete(archive)}
            >
              <Octicon icon={Trashcan} size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

ArchiveList.propTypes = {
  archives: arrayOf(Archive).isRequired,
  onDelete: func.isRequired,
};
