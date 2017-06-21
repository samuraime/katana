import { getAuthToken } from './storage';

export const getJSONHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
};

export const getAuthHeaders = () => {
  const headers = getJSONHeaders();
  headers.append('Authorization', `Bearer ${getAuthToken()}`);
  return headers;
};
