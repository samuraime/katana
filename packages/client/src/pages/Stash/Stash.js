import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../components/Container';
import stashActions from '../../store/stash/actions';
import Uploader from './Uploader';
import ArchiveList from './ArchiveList';

const StashPage = styled(Container)`
  white-space: nowrap;
`;

const StyledUploader = styled(Uploader)`
  width: 100%;
  margin: 1rem auto;
  cursor: pointer;
`;

const StyledArchiveList = styled(ArchiveList)`
  width: 100%;
  margin: 1rem auto;
`;

function Stash() {
  const dispatch = useDispatch();
  const isSuperUser = useSelector(({ user }) => user.superUser);
  const archives = useSelector(({ stash }) => stash.archives);

  useEffect(() => {
    dispatch(stashActions.getArchives());
  }, [dispatch]);

  const handleDelete = (archive) => {
    if (window.confirm('Do you really delete it?')) {
      dispatch(stashActions.deleteArchive(archive.id));
    }
  };

  return (
    <StashPage>
      {isSuperUser && (
        <StyledUploader archives={archives} dispatch={dispatch} />
      )}
      <StyledArchiveList
        archives={archives}
        deletable={isSuperUser}
        onDelete={handleDelete}
      />
    </StashPage>
  );
}

export default Stash;
