import { getAuthHeaders } from '../services/request';
import { setAuthToken, removeAuthToken } from '../services/storage';

const API_ROOT = '//localhost:3000/api';

// make mongodb `_id` to `id`
const normalizeId = (json) => {
  if (Array.isArray(json)) {
    return json.map(normalizeId);
  }
  if (typeof json === 'object') {
    const normalizedJson = {};
    Object.keys(json).forEach((key) => {
      if (key === '_id') {
        normalizedJson.id = json[key];
      } else {
        normalizedJson[key] = normalizeId(json[key]);
      }
    });
    return normalizedJson;
  }
  return json;
};

const callApi = (endpoint, method = 'GET', body) => {
  const fullUrl = endpoint.includes(API_ROOT) ? endpoint : `${API_ROOT}${endpoint}`;
  const headers = getAuthHeaders();

  const init = {
    headers,
    method: method.toUpperCase(),
    body: JSON.stringify(body),
    mode: 'cors',
  };

  return fetch(fullUrl, init)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`${response.status} ${response.statusText}`);
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
  const callAPI = action[CALL_API];
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

  const actionWith = (data) => {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, method, body).then(
    response => next(actionWith({
      response,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    })),
  );
};
