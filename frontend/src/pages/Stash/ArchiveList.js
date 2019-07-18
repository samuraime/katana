import React from 'react';
import Octicon, { Trashcan, CloudDownload } from '@primer/octicons-react';
import { bool, func, arrayOf, Archive } from '../../types';
import { getDownloadLink } from '../../utils';
import getIcon from '../../utils/icon';
import formatSize from '../../utils/formatSize';
import s from './ArchiveList.module.scss';

export default function ArchiveList({
  archives,
  deletable,
  onDelete,
  ...otherProps
}) {
  return (
    <div {...otherProps}>
      {archives.map(archive => (
        <div key={archive.id} className={s.item}>
          <Octicon
            className={s.typeIcon}
            icon={getIcon(archive.name)}
            size={20}
          />
          <div className={s.archiveInfo}>
            <span>{archive.name}</span>
            <span>{formatSize(archive.size)}</span>
          </div>
          <div className={s.actions}>
            <a
              href={getDownloadLink(archive.key || archive.hash)}
              download={archive.name}
              className={s.download}
            >
              <Octicon icon={CloudDownload} size={20} />
            </a>
            {deletable && (
              <button
                type="button"
                className={s.delete}
                onClick={() => onDelete(archive)}
              >
                <Octicon icon={Trashcan} size={20} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

ArchiveList.propTypes = {
  archives: arrayOf(Archive).isRequired,
  onDelete: func.isRequired,
  deletable: bool.isRequired,
};
