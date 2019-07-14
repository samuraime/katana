import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bool, func, arrayOf, Archive } from '../../types';
import stashActions from '../../store/stash/actions';
import Uploader from './Uploader';
import ArchiveList from './ArchiveList';
import { withNavigation } from '../../components/Navigation';
import s from './Stash.module.scss';

function Stash({ superUser, archives, uploaderArchives, dispatch }) {
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
      {superUser && (
        <Uploader
          archives={uploaderArchives}
          className={s.uploader}
          dispatch={dispatch}
        />
      )}
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
  superUser: bool.isRequired,
};

const mapStateToProps = ({ user, stash }) => ({
  superUser: user.superUser,
  archives: stash.archives,
  uploaderArchives: stash.uploaderArchives,
});

export default compose(
  withNavigation({ title: 'Stash' }),
  withRouter,
  connect(mapStateToProps)
)(Stash);
