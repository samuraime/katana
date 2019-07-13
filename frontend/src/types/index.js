import {
  string,
  number,
  bool,
  func,
  shape,
  arrayOf,
  node,
  oneOfType,
} from 'prop-types';

export { string, number, bool, func, shape, arrayOf, node, oneOfType };

export const Archive = shape({
  id: string,
  key: string,
  name: string,
  size: number,
  type: string,
  hash: string,
});
