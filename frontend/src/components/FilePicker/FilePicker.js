import React, { createElement, useState, useRef } from 'react';
import classnames from 'classnames';
import { string, bool, func, node, oneOfType } from '../../types';

export default function FilePicker({
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
    const files = Array.from(e.target.files);
    onChange(e, files);
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
      style={{ display: 'none' }}
      type="file"
      multiple={multiple}
      onChange={handleChange}
    />
  );

  return createElement(elementType, props, ghostInput, children);
}

FilePicker.propTypes = {
  elementType: oneOfType([string, func]),
  className: string,
  hoverClassName: string,
  multiple: bool,
  children: node,
  onChange: func,
};

FilePicker.defaultProps = {
  elementType: 'div',
  className: '',
  hoverClassName: '',
  multiple: true,
  children: null,
  onChange: () => {},
};
