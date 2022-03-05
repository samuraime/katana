import React from 'react';
import styled from 'styled-components';
import Octicon, { CloudUpload } from '@primer/octicons-react';
import Surface from '../../components/Surface';
import FilePicker from '../../components/FilePicker';
import stashActions from '../../store/stash/actions';
import { func, arrayOf, Archive } from '../../types';
import { color, surface } from '../../styles';

const PickerZoneContainer = styled(Surface)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 6rem;
  padding: 1rem;
  border: 2px dashed $gray-400;
  margin: 0 auto 1rem;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;

  ${({ isDragOver }) =>
    isDragOver &&
    `
    border: 2px dashed ${color.gray200}};
    background: ${surface[2]};
  `}
`;

const PickerZone = (props) => (
  <PickerZoneContainer {...props}>
    <Octicon icon={CloudUpload} size={100} />
    <p>Drop files here!</p>
  </PickerZoneContainer>
);

function Uploader({ archives, dispatch, ...otherProps }) {
  const handleChange = (e, files) => {
    dispatch(stashActions.appendNewArchives(files));
  };

  return <FilePicker contentMaker={PickerZone} onChange={handleChange} />;
}

Uploader.propTypes = {
  dispatch: func.isRequired,
  archives: arrayOf(Archive).isRequired,
};

export default Uploader;
