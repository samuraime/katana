import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../components/Container';
import yumeActions from '../../store/yume/actions';
import YumeCard from './YumeCard';
import YumeCalendar from './YumeCalendar';
import YumeMaker from './YumeMaker';
import styled from 'styled-components';

const StyledYumeCalendar = styled(YumeCalendar)`
  margin-top: 1rem;
`;

const StyledYumeMaker = styled(YumeMaker)`
  margin: 0 0 1rem;
`;

const StyleYumeCard = styled(YumeCard)`
  margin: 0.75rem 0;
`;

function Yume() {
  const dispatch = useDispatch();
  const yumes = useSelector(({ yume }) => yume.yumes);
  const calendarRecords = useSelector(({ yume }) => yume.calendarRecords);
  const user = useSelector((state) => state.user);
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
    <Container>
      <StyledYumeCalendar records={calendarRecords} />
      {user.superUser && (
        <StyledYumeMaker key={makerKey} onSubmit={handleSubmit} />
      )}
      {yumes.map((yume) => (
        <StyleYumeCard
          key={yume.id}
          yume={yume}
          onDelete={getDeteleHandler(yume)}
        />
      ))}
    </Container>
  );
}

export default Yume;
