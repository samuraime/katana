export { default as http } from './http';
export { default as download } from './download';
export { default as formatDate } from './formatDate';

export const noop = () => {};

export const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

/**
 * @param {string} redirectURL
 * @return {string}
 */
export const getLoginURL = redirectURL => {
  return `/auth/github?redirect_uri=${encodeURIComponent(
    redirectURL || window.location.href
  )}`;
};
