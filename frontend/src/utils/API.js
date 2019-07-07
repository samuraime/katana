import http from './http';

// eslint-disable-next-line
export const getUser = () => {
  return http.get('/api/user');
};
