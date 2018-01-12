import { getAuthHeaders } from '../services/request';
import { setAuthToken, removeAuthToken } from '../services/storage';
import normalizeId from './normalize-id';

// inject from webpack
const API_ROOT = API_URL; // eslint-disable-line

export const stringify = (params) => {
  if (typeof params !== 'object') {
    return '';
  }
  return Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
};

export const request = (method = 'GET') => (endpoint, payload) => {
  let fullUrl = endpoint.includes(API_ROOT) ? endpoint : `${API_ROOT}${endpoint}`;
  const headers = getAuthHeaders();
  const upperCasedMethod = method.toUpperCase();

  if (upperCasedMethod === 'GET' && payload) {
    fullUrl += `?${stringify(payload)}`;
  }
  const init = {
    headers,
    method: upperCasedMethod,
    body: upperCasedMethod !== 'GET' ? JSON.stringify(payload) : null,
    mode: 'cors',
  };

  return fetch(fullUrl, init)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`));
      }
      const contentType = response.headers.get('Content-Type');
      if (contentType && /application\/json/.test(contentType)) {
        return response.json().then((json) => {
          // handle login response
          if (endpoint === '/login' && init.method === 'POST') {
            setAuthToken(json.token);
          }
          return normalizeId(json);
        });
      }

      // handle logout response
      if (endpoint === '/login' && init.method === 'DELETE') {
        removeAuthToken();
      }
      // assume other content-type is text
      return response.text();
    });
};

export default {
  stringify,
  request,
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};
