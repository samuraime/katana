import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import { func } from '../../types';
import s from './YumeMaker.module.scss';

function YumeMaker({ onSubmit, ...otherProps }) {
  const [text, setText] = useState('');
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleRecord() {
    onSubmit({
      text,
      public: visible,
    });
  }

  function handleFocus() {
    setActive(true);
  }

  function handleClose() {
    setActive(false);
  }

  function handlePublicChange(event) {
    setVisible(event.target.checked);
  }

  const rows = active ? 5 : 1;

  return (
    <div {...otherProps}>
      <div className={s.editor}>
        <TextField
          label="Compose a yume"
          multiline
          rows={rows}
          rowsMax={8}
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          className={s.text}
          margin="normal"
          variant="outlined"
          inputProps={{
            className: s.input,
          }}
        />
        {active && (
          <IconButton
            className={s.expandLess}
            onClick={handleClose}
            aria-expanded={active}
            aria-label="close"
          >
            <ExpandLessIcon />
          </IconButton>
        )}
      </div>
      {active && (
        <div className={s.actions}>
          <FormControlLabel
            control={
              <Switch
                checked={visible}
                onChange={handlePublicChange}
                value
                color="primary"
              />
            }
            label={visible ? 'Public' : 'Private'}
          />
          <Button variant="contained" color="primary" onClick={handleRecord}>
            Done
          </Button>
        </div>
      )}
    </div>
  );
}

YumeMaker.propTypes = {
  onSubmit: func.isRequired,
};

export default YumeMaker;
