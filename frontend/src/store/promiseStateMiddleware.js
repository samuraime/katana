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
  if (!(action.payload instanceof Promise)) {
    next(action);
    return;
  }

  next(getAction(action, pending));

  action.payload
    .then(result => {
      next(getAction(action, fulfill, result));
    })
    .catch(error => {
      next(getAction(action, reject, error));
    });
};
