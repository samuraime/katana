/* eslint-disable import/prefer-default-export */

/**
 * a helper for redux-promise-middleware
 *
 * even if dispatch a instant resolved Promise, still need to await fulfilled and rejected actions
 */
export const nextFrame = () => new Promise(resolve => setTimeout(resolve));
