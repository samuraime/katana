import React, { createElement, useState, useRef } from 'react';
import classnames from 'classnames';
import { string, bool, func, node, oneOfType } from '../../types';
import s from './DragAndDrop.module.scss';

export default function DragAndDrop({
  elementType,
  className,
  hoverClassName,
  multiple,
  children,
  onChange,
}) {
  const [isDragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleTrigger = () => {
    const pickEvent = new MouseEvent('click');
    inputRef.current.dispatchEvent(pickEvent);
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onChange(e, files);
  };

  const handleChange = e => {
    onChange(e, e.target.files);
  };

  const props = {
    className: classnames(className, { [hoverClassName]: isDragOver }),
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    onClick: handleTrigger,
  };
  const ghostInput = (
    <input
      ref={inputRef}
      className={s.fileInput}
      type="file"
      multiple={multiple}
      onChange={handleChange}
    />
  );

  return createElement(elementType, props, ghostInput, children);
}

DragAndDrop.propTypes = {
  elementType: oneOfType([string, func]),
  className: string,
  hoverClassName: string,
  multiple: bool,
  children: node,
  onChange: func,
};

DragAndDrop.defaultProps = {
  elementType: 'div',
  className: '',
  hoverClassName: '',
  multiple: true,
  children: null,
  onChange: () => {},
};
