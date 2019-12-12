import React from 'react';
import PropTypes from 'prop-types';
import s from './Timeline.module.scss';

function Timeline({ events, ...otherProps }) {
  return (
    <ul {...otherProps}>
      {events.map(event => (
        <li key={event.start} className={s.event}>
          <span>{event.start}</span>
          <span> ~ </span>
          <span>{event.end}</span>
          <span className={s.title}>{event.title}</span>
        </li>
      ))}
    </ul>
  );
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Timeline;
