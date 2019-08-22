import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import yumeActions from '../../store/yume/actions';
import YumeCard from './YumeCard';
import YumeMaker from './YumeMaker';
import s from './Yume.module.scss';

function Yume() {
  const dispatch = useDispatch();
  const yumes = useSelector(({ yume }) => yume.yumes);
  const user = useSelector(state => state.user);

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

  function handleSubmit(yume) {
    dispatch(yumeActions.createYume(yume));
  }

  return (
    <div className={s.root}>
      <YumeMaker className={s.yumeMaker} onSubmit={handleSubmit} />
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

export default Yume;
