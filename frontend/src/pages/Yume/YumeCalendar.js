import React, { useCallback } from 'react';
import CalendarGraph from '../../components/CalendarGraph';
import formatDate from '../../utils/date';

const getColor = key => {
  const colorMap = {
    normal: '#7bc96f',
    nightmare: '#000',
  };

  return colorMap[key] || '#ebedf0';
};

function YumeCalendar() {
  const posts = [
    {
      type: 'normal',
      date: '2018-12-10',
    },
    {
      type: 'normal',
      date: '2019-01-10',
    },
    {
      type: 'nightmare',
      date: '2019-10-10',
    },
  ];
  const end = new Date();
  const start = new Date(end);
  start.setFullYear(end.getFullYear() - 1);

  const colorFn = useCallback(
    date => {
      const found = posts.find(
        post => formatDate(post.date) === formatDate(date)
      );
      const type = found ? found.type : '';
      return getColor(type);
    },
    [posts]
  );

  return <CalendarGraph start={start} end={end} color={colorFn} />;
}

export default YumeCalendar;
