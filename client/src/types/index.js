import PropTypes from 'prop-types';

export const Bookmark = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  website: PropTypes.string,
  description: PropTypes.string,
});

export default {};
