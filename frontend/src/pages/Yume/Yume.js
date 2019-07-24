import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, Yume as YumeType } from '../../types';
import yumeActions from '../../store/yume/actions';
import YumeCard from './YumeCard';

function Yume({ yumes, dispatch }) {
  useEffect(() => {
    dispatch(yumeActions.getYumes());
  }, [dispatch]);

  return (
    <div>
      {yumes.map(yume => (
        <YumeCard key={yume.id} yume={yume} />
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

export default connect(mapStateToProps)(Yume);
