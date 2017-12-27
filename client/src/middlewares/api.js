import { getAuthHeaders } from '../services/request';
import { setAuthToken, removeAuthToken } from '../services/storage';
import normalizeId from '../utils/normalize-id';
import utils from '../utils';

// inject from webpack
const API_ROOT = API_URL; // eslint-disable-line

const callApi = (endpoint, method = 'GET', body) => {
  let fullUrl = endpoint.includes(API_ROOT) ? endpoint : `${API_ROOT}${endpoint}`;
  const headers = getAuthHeaders();
  const upperCasedMethod = method.toUpperCase();

  if (upperCasedMethod === 'GET' && body) {
    fullUrl += `?${utils.stringify(body)}`;
  }
  const init = {
    headers,
    method: upperCasedMethod,
    body: upperCasedMethod !== 'GET' ? JSON.stringify(body) : null,
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

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call_API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
  const { [CALL_API]: callAPI, ...payload } = action;
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, method, body } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = types;
  next({ type: requestType, ...payload });

  return callApi(endpoint, method, body).then(
    response => next({
      ...payload,
      type: successType,
      request: body,
      response,
    }),
    error => next({
      ...payload,
      type: failureType,
      request: body,
      error,
    }),
  );
};
