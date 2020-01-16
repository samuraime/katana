import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import s from './Container.module.scss';

export default function Container({ component, className, ...otherProps }) {
  return React.createElement(component, {
    className: classnames(s.root, className),
    ...otherProps,
  });
}

Container.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
};

Container.defaultProps = {
  component: 'div',
  className: '',
};
