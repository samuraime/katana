import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../components/Container';
import stashActions from '../../store/stash/actions';
import Uploader from './Uploader';
import ArchiveList from './ArchiveList';
import s from './Stash.module.scss';

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
    <Container className={s.root}>
      {isSuperUser && (
        <Uploader
          archives={archives}
          className={s.uploader}
          dispatch={dispatch}
        />
      )}
      <ArchiveList
        className={s.archiveList}
        archives={archives}
        deletable={isSuperUser}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default Stash;
