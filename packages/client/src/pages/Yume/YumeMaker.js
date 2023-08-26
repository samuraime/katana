import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { func } from '../../types';
import styled from 'styled-components';

const Editor = styled.div`
  position: relative;
`;

const StyledTextField = styled(TextField)`
  width: 100%;

  // TODO: how to generate a className from styled-components?
  textarea {
    transition: height 0.3s ease;
  }
`;

const ToggleButton = styled(IconButton).attrs({
  size: 'large',
})`
  position: absolute !important;
  right: 0.5rem;
  bottom: 1rem;
`;

const ActionPanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

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
      <Editor>
        <StyledTextField
          label="Compose a yume"
          multiline
          rows={rows}
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          margin="normal"
          variant="outlined"
        />
        {active && (
          <ToggleButton
            onClick={handleClose}
            aria-expanded={active}
            aria-label="close"
          >
            <ExpandLessIcon />
          </ToggleButton>
        )}
      </Editor>
      {active && (
        <ActionPanel>
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
        </ActionPanel>
      )}
    </div>
  );
}

YumeMaker.propTypes = {
  onSubmit: func.isRequired,
};

export default YumeMaker;
