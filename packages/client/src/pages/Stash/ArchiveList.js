import React from 'react';
import styled from 'styled-components';
import Octicon, { Trashcan, CloudDownload } from '@primer/octicons-react';
import List, { ListItem } from '../../components/List';
import { bool, func, arrayOf, Archive } from '../../types';
import { download } from '../../utils';
import { formatSize, getIconComponent } from './utils';

const StyledListItem = styled(ListItem)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  margin: 0.5rem 0;

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

const ArchiveIcon = styled(Octicon).attrs({
  size: 20,
})`
  flex: none;
  margin-right: 0.5rem;
`;

const ArchiveInfo = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  width: 100%;

  > * {
    margin-right: 0.5rem;
  }
`;

const ArchiveActions = styled.div`
  flex: none;
`;

const ArchiveAction = styled.button.attrs({
  type: 'button',
})`
  height: 100%;
  padding: 0 0.5rem;
  cursor: pointer;
  color: #999;
  background: transparent;

  :hover {
    color: inherit;
  }
`;

const ArchiveProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 0;
  background: hsl(130, 60%, 60%);
  transition: all 0.2s;
  z-index: -10;
`;

export default function ArchiveList({
  archives,
  deletable,
  onDelete,
  ...otherProps
}) {
  const save = (archive) => () => {
    download(archive.link, archive.name);
  };

  return (
    <List {...otherProps}>
      {archives.map((archive) => {
        const isDone = !archive.status || archive.status === 'DONE';

        return (
          <StyledListItem key={archive.id}>
            <ArchiveIcon icon={getIconComponent(archive.name)} />
            <ArchiveInfo>
              <span>{archive.name}</span>
              <span>{formatSize(archive.size)}</span>
            </ArchiveInfo>
            <ArchiveActions>
              {isDone && (
                <ArchiveAction onClick={save(archive)}>
                  <Octicon icon={CloudDownload} size={20} />
                </ArchiveAction>
              )}
              {deletable && (
                <ArchiveAction onClick={() => onDelete(archive)}>
                  <Octicon icon={Trashcan} size={20} />
                </ArchiveAction>
              )}
            </ArchiveActions>
            {!isDone && (
              <ArchiveProgress
                style={{ width: `${(archive.uploaded / archive.size) * 100}%` }}
              />
            )}
          </StyledListItem>
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
