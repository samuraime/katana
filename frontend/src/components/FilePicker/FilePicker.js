import React, { createElement, useState, useRef, Fragment } from 'react';
import { bool, func, elementType } from '../../types';

export default function FilePicker({ multiple, contentMaker, onChange }) {
  const [isDragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleTrigger = () => {
    const pickEvent = new MouseEvent('click');
    inputRef.current.dispatchEvent(pickEvent);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onChange(e, files);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(e, files);
  };

  const props = {
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

  return (
    <Fragment>
      {createElement(contentMaker, {
        isDragOver,
        ...props,
      })}
      {ghostInput}
    </Fragment>
  );
}

FilePicker.propTypes = {
  multiple: bool,
  contentMaker: elementType.isRequired,
  onChange: func,
};

FilePicker.defaultProps = {
  multiple: true,
  onChange: () => {},
};
