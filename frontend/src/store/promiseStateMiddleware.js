const defaultStateMap = {
  pending: '_PENDING',
  fulfill: '_SUCCESS',
  reject: '_FAILURE',
};

/**
 * separate a promise action into 3 actions
 *
 * @param {Object} stateMap
 */
export default (stateMap = defaultStateMap) => {
  const getAction = (action, suffix, payload) => {
    return {
      ...action,
      type: `${action.type}${suffix}`,
      payload,
    };
  };

  return () => next => action => {
    if (!(action.payload instanceof Promise)) {
      next(action);
      return;
    }

    next(getAction(action, stateMap.pending));

    action.payload
      .then(res => {
        next(getAction(action, stateMap.fulfill, res));
      })
      .catch(err => {
        next(getAction(action, stateMap.reject, err));
      });
  };
};
