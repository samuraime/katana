import React, { useCallback } from 'react';
import CalendarGraph from '../../components/CalendarGraph';
import formatDate from '../../utils/date';
import { YumeRecord, arrayOf } from '../../types';

const getColor = key => {
  const colorMap = {
    normal: '#fff',
    nightmare: '#000',
  };

  return colorMap[key] || '#fff';
};

function YumeCalendar({ records, ...props }) {
  const end = new Date();
  const start = new Date(end);
  start.setFullYear(end.getFullYear() - 1);

  const colorFn = useCallback(
    date => {
      const found = records.find(record => {
        return formatDate(record.createdAt) === formatDate(date);
      });
      const type = found ? found.type || 'normal' : '';
      return getColor(type);
    },
    [records]
  );

  return <CalendarGraph start={start} end={end} color={colorFn} {...props} />;
}

YumeCalendar.propTypes = {
  records: arrayOf(YumeRecord).isRequired,
};

export default YumeCalendar;
