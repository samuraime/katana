import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { func } from '../../types';
import s from './YumeMaker.module.scss';

function YumeMaker({ onSubmit, ...otherProps }) {
  const [text, setText] = useState('');

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleRecord() {
    onSubmit(text);
  }

  return (
    <div {...otherProps}>
      <TextField
        label="Record a yume"
        multiline
        rows={4}
        rowsMax="4"
        value={text}
        onChange={handleChange}
        className={s.text}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={handleRecord}>Record</Button>
    </div>
  );
}

YumeMaker.propTypes = {
  onSubmit: func.isRequired,
};

export default YumeMaker;
