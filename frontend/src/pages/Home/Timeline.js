import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem } from '../../components/List';
import s from './Timeline.module.scss';

function Timeline({ events, ...otherProps }) {
  return (
    <List {...otherProps}>
      {events.map((event) => (
        <ListItem key={event.start} className={s.event}>
          <span>{event.start}</span>
          <span> ~ </span>
          <span>{event.end}</span>
          <span className={s.title}>{event.title}</span>
        </ListItem>
      ))}
    </List>
  );
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Timeline;
