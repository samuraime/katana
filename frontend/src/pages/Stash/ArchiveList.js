import React from 'react';
import Octicon, { Trashcan, CloudDownload } from '@primer/octicons-react';
import List, { ListItem } from '../../components/List';
import { bool, func, arrayOf, Archive } from '../../types';
import { getDownloadLink } from '../../utils';
import getIconComponent from './utils/getIconComponent';
import formatSize from './utils/formatSize';
import s from './ArchiveList.module.scss';

export default function ArchiveList({
  archives,
  deletable,
  onDelete,
  ...otherProps
}) {
  return (
    <List {...otherProps}>
      {archives.map(archive => (
        <ListItem key={archive.id} className={s.item}>
          <Octicon
            className={s.typeIcon}
            icon={getIconComponent(archive.name)}
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
              target="_blank"
              rel="noopener noreferrer"
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
        </ListItem>
      ))}
    </List>
  );
}

ArchiveList.propTypes = {
  archives: arrayOf(Archive).isRequired,
  onDelete: func.isRequired,
  deletable: bool.isRequired,
};
