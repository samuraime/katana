/**
 * @see https://3dtransforms.desandro.com/carousel
 */

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import s from './Carousel.module.scss';

function Carousel({
  index,
  width,
  height,
  vertical,
  duration,
  className,
  children,
  ...props
}) {
  const theta = children.length ? (2 * Math.PI) / children.length : 0;
  const size = vertical ? height : width;
  const radius = size / 2 / Math.tan(theta / 2);
  const rotateFn = vertical ? 'rotateX' : 'rotateY';

  return (
    <div className={classnames(s.scene, className)} {...props}>
      <div
        className={s.carousel}
        style={{
          width,
          height,
          transform: `translateZ(${-radius}px) ${rotateFn}(${-1 *
            theta *
            index}rad)`,
          transitionDuration: `${duration}s`,
        }}
      >
        {children.map((child, i) =>
          React.cloneElement(child, {
            className: classnames(s.element, child.props.className),
            style: {
              transform: `${rotateFn}(${theta * i}rad) translateZ(${radius}px)`,
              ...child.props.style,
            },
          })
        )}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  index: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  vertical: PropTypes.bool,
  duration: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

Carousel.defaultProps = {
  index: 0,
  width: 200,
  height: 200,
  vertical: false,
  duration: 1,
  className: '',
  children: [],
};

export default Carousel;
