import React from 'react';
import PropTypes from 'prop-types';
import getCalendarDays from './getCalendarDays';

function CalendarGraph({ start, end, color, ...props }) {
  const weeks = getCalendarDays(start, end);
  const size = 12;
  const gap = 3;
  const offset = size + gap;
  const width = weeks.length <= 1 ? size : weeks.length * offset - gap;
  const height = offset * 7 - gap;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} {...props}>
      <g>
        {weeks.map((days, weekIndex) => (
          <g
            /* eslint-disable-next-line react/no-array-index-key */
            key={weekIndex}
            transform={`translate(${weekIndex * offset}, 0)`}
            className="week"
          >
            {days.map(
              (day, dayIndex) =>
                day && (
                  <rect
                    key={day}
                    className="day"
                    width={size}
                    height={size}
                    x={0}
                    y={dayIndex * offset}
                    fill={color(day)}
                  />
                )
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

const DateType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.string,
  PropTypes.number,
]);

CalendarGraph.propTypes = {
  start: DateType.isRequired,
  end: DateType.isRequired,
  color: PropTypes.func.isRequired,
};

export default CalendarGraph;
