import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import s from './Surface.module.scss';

function Surface({ elevation, component, className, children, ...otherProps }) {
  return React.createElement(
    component,
    {
      ...otherProps,
      className: classnames(s[`elevation${elevation}`], className),
    },
    children
  );
}

Surface.propTypes = {
  elevation: PropTypes.number,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
  children: PropTypes.node,
};

Surface.defaultProps = {
  elevation: 1,
  component: 'div',
  className: '',
  children: null,
};

export default Surface;
