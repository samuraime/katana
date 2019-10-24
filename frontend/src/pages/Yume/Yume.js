import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import yumeActions from '../../store/yume/actions';
import YumeCard from './YumeCard';
import YumeCalendar from './YumeCalendar';
import YumeMaker from './YumeMaker';
import s from './Yume.module.scss';

function Yume() {
  const dispatch = useDispatch();
  const yumes = useSelector(({ yume }) => yume.yumes);
  const calendarRecords = useSelector(({ yume }) => yume.calendarRecords);
  const user = useSelector(state => state.user);
  const [makerKey, setMakerKey] = useState(0);

  useEffect(() => {
    dispatch(yumeActions.getYumes());
    dispatch(yumeActions.getYumeCalendar());
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
    dispatch(yumeActions.createYume(yume)).then(() => {
      // reset YumeMaker
      setMakerKey(makerKey ? 0 : 1);
    });
  }

  return (
    <div className={s.root}>
      <YumeCalendar className={s.yumeCalendar} records={calendarRecords} />
      <YumeMaker
        key={makerKey}
        className={s.yumeMaker}
        onSubmit={handleSubmit}
      />
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
