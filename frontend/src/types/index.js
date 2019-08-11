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

// TODO: map MongoDB Schema to PropTypes

export const User = shape({
  id: string,
  avatar: string,
  email: string,
  login: string,
  name: string,
  superUser: bool,
  updatedAt: string,
  createdAt: string,
});

export const Archive = shape({
  id: string,
  key: string,
  name: string,
  size: number,
  type: string,
  hash: string,
});

export const Article = shape({
  title: string,
  markdown: string,
  content: string,
  categories: arrayOf(string),
  author: User,
  public: bool,
  createdAt: string,
  updatedAt: string,
});

export const Yume = shape({
  id: string,
  text: string,
  images: arrayOf(string),
  tags: arrayOf(string),
  stars: number,
  stargazers: arrayOf(User),
  dreamer: User,
  location: shape({
    name: string,
    longitude: number,
    latitude: number,
  }),
  public: bool,
  createdAt: string,
});
