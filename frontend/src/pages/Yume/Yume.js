import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { func, arrayOf, Yume as YumeType } from '../../types';
import yumeActions from '../../store/yume/actions';
import { withNavigation } from '../../components/Navigation';
import YumeCard from './YumeCard';
import s from './Yume.module.scss';

function Yume({ yumes, dispatch }) {
  useEffect(() => {
    dispatch(yumeActions.getYumes());
  }, [dispatch]);

  return (
    <div className={s.root}>
      {yumes.map(yume => (
        <YumeCard key={yume.id} yume={yume} className={s.yumeCard} />
      ))}
    </div>
  );
}

Yume.propTypes = {
  yumes: arrayOf(YumeType).isRequired,
  dispatch: func.isRequired,
};

function mapStateToProps({ yume }) {
  return {
    yumes: yume.yumes,
  };
}

export default compose(
  withNavigation({ title: 'YumeHub' }),
  connect(mapStateToProps)
)(Yume);
