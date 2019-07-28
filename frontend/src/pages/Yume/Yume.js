import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { func, arrayOf, User, Yume as YumeType } from '../../types';
import yumeActions from '../../store/yume/actions';
import { withNavigation } from '../../components/Navigation';
import YumeCard from './YumeCard';
import s from './Yume.module.scss';

function Yume({ yumes, dispatch, user }) {
  useEffect(() => {
    dispatch(yumeActions.getYumes());
  }, [dispatch]);

  function getDeteleHandler(yume) {
    if (yume.dreamer.id !== user.id) {
      return false;
    }

    return function handleDelete() {
      dispatch(yumeActions.deleteYume(yume.id));
    };
  }

  return (
    <div className={s.root}>
      {yumes.map(yume => (
        <YumeCard
          key={yume.id}
          yume={yume}
          className={s.yumeCard}
          onDelete={getDeteleHandler(yume)}
        />
      ))}
    </div>
  );
}

Yume.propTypes = {
  yumes: arrayOf(YumeType).isRequired,
  user: User.isRequired,
  dispatch: func.isRequired,
};

function mapStateToProps({ yume, user }) {
  return {
    yumes: yume.yumes,
    user,
  };
}

export default compose(
  withNavigation({ title: 'YumeHub' }),
  connect(mapStateToProps)
)(Yume);
