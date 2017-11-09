import PropTypes from 'prop-types';

export const Archive = PropTypes.shape({
  id: PropTypes.string,
  key: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  hash: PropTypes.string,
});

export default {};
