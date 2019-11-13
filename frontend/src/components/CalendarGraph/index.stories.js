import React from 'react';
import CalendarGraph from '.';

export default { title: 'CalendarGraph' };

export const DefaultCalendarGraph = () => {
  const colorFn = () => '#000';

  return <CalendarGraph start="2018-01-01" end="2019-01-01" color={colorFn} />;
};

DefaultCalendarGraph.story = {
  name: 'default',
};
