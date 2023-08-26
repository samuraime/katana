import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List, { ListItem } from '../../components/List';
import { fontFamily } from '../../styles';

const EventItem = styled(ListItem)`
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  line-height: 1.5;
  font-family: ${fontFamily.mono};
`;

const EventTitle = styled.span`
  margin-left: 1rem;
`;

function Timeline({ events, ...otherProps }) {
  return (
    <List {...otherProps}>
      {events.map((event) => (
        <EventItem key={event.start}>
          <span>{event.start}</span>
          <span> ~ </span>
          <span>{event.end}</span>
          <EventTitle>{event.title}</EventTitle>
        </EventItem>
      ))}
    </List>
  );
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Timeline;
