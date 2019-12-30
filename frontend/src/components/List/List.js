import React from 'react';
import PropTypes from 'prop-types';

function List({ children, ...otherProps }) {
  return <ul {...otherProps}>{children}</ul>;
}

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

List.defaultProps = {
  children: [],
};

export default List;
