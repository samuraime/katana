import utils from '../utils';

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

  return utils.request(method)(endpoint, body).then(
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
