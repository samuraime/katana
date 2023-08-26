import styled from 'styled-components';
import PropTypes from 'prop-types';
import { elevationColors, elevationHoverColors } from '../../styles';

const Surface = styled.div`
  background-color: ${({ elevation }) => elevationColors[elevation]};

  :hover {
    background-color: ${({ elevation }) => elevationHoverColors[elevation]};
  }
`;

Surface.propTypes = {
  elevation: PropTypes.number,
};

Surface.defaultProps = {
  elevation: 1,
};

export default Surface;
