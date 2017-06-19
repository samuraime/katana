const API_ROOT = '//localhost:3000/api/';

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

// Extracts the next page URL from Github API response.
// const getNextPageUrl = (response) => {
//   const link = response.headers.get('link');
//   if (!link) {
//     return null;
//   }

//   const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
//   if (!nextLink) {
//     return null;
//   }

//   return nextLink.split(';')[0].slice(1, -1);
// };

const callApi = (endpoint, method = 'GET', body) => {
  const fullUrl = endpoint.includes(API_ROOT) ? endpoint : `${API_ROOT}${endpoint}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const init = {
    // headers,
    method: method.toUpperCase(),
    body: JSON.stringify(body),
    mode: 'cors',
  };

  return fetch(fullUrl, init)
    .then(response =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        return normalizeId(json);

        // return { ...normalizedJson };
        // const nextPageUrl = getNextPageUrl(response);
        // return { ...normalizedJson, nextPageUrl };
      }),
    );
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
