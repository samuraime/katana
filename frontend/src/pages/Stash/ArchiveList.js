import React from 'react';
import Octicon, { Trashcan, CloudDownload } from '@primer/octicons-react';
import List, { ListItem } from '../../components/List';
import { bool, func, arrayOf, Archive } from '../../types';
import { download } from '../../utils';
import { formatSize, getIconComponent } from './utils';
import s from './ArchiveList.module.scss';

export default function ArchiveList({
  archives,
  deletable,
  onDelete,
  ...otherProps
}) {
  const save = archive => () => {
    download(archive.link, archive.name);
  };

  return (
    <List {...otherProps}>
      {archives.map(archive => {
        const isDone = !archive.status || archive.status === 'DONE';

        return (
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
              {isDone && (
                <button
                  type="button"
                  className={s.download}
                  onClick={save(archive)}
                >
                  <Octicon icon={CloudDownload} size={20} />
                </button>
              )}
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
            {!isDone && (
              <div
                className={s.progress}
                style={{ width: `${(archive.uploaded / archive.size) * 100}%` }}
              />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

ArchiveList.propTypes = {
  archives: arrayOf(Archive).isRequired,
  onDelete: func.isRequired,
  deletable: bool.isRequired,
};
