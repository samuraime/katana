const defaultSuffixMap = {
  pending: '_PENDING',
  fulfill: '_SUCCESS',
  reject: '_FAILURE',
};

const getAction = (action, suffix, payload) => {
  return {
    ...action,
    type: `${action.type}${suffix}`,
    payload,
  };
};

/**
 * separate a promise action into 3 actions
 *
 * @param {Object} stateSuffixMap
 */
export default ({
  pending,
  fulfill,
  reject,
} = defaultSuffixMap) => () => next => action => {
  const { payload } = action;

  if (!(payload instanceof Promise)) {
    return next(action);
  }

  next(getAction(action, pending));

  return action.payload
    .then(result => {
      next(getAction(action, fulfill, result));
    })
    .catch(error => {
      next(getAction(action, reject, error));
    });
};
