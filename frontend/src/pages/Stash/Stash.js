import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { func, arrayOf, Archive } from '../../types';
import stashActions from '../../store/stash/actions';
import Uploader from './Uploader';
import ArchiveList from './ArchiveList';
import s from './Stash.module.scss';

function Stash({ archives, uploaderArchives, dispatch }) {
  useEffect(() => {
    dispatch(stashActions.getArchives());
  }, [dispatch]);

  const handleDelete = archive => {
    if (window.confirm('Do you really delete it?')) {
      dispatch(stashActions.deleteArchive(archive.id));
    }
  };

  return (
    <div className={s.root}>
      <Uploader
        archives={uploaderArchives}
        className={s.uploader}
        dispatch={dispatch}
      />
      <ArchiveList
        className={s.archiveList}
        archives={archives}
        onDelete={handleDelete}
      />
    </div>
  );
}

Stash.propTypes = {
  dispatch: func.isRequired,
  uploaderArchives: arrayOf(Archive).isRequired,
  archives: arrayOf(Archive).isRequired,
};

const mapStateToProps = ({ stash }) => ({
  archives: stash.archives,
  uploaderArchives: stash.uploaderArchives,
});

export default withRouter(connect(mapStateToProps)(Stash));
