import React from 'react';
import PropTypes from 'prop-types';
import Surface from '../../components/Surface';
import s from './Timeline.module.scss';

function Timeline({ events, ...otherProps }) {
  return (
    <ul {...otherProps}>
      {events.map(event => (
        <Surface key={event.start} component="li" className={s.event}>
          <span>{event.start}</span>
          <span> ~ </span>
          <span>{event.end}</span>
          <span className={s.title}>{event.title}</span>
        </Surface>
      ))}
    </ul>
  );
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Timeline;
