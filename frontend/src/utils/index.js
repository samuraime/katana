import { DOWNLOAD_DOMAIN } from '../constants/upload';

export { default as formatDate } from './formatDate';

export const noop = () => {};

export const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

/**
 * @param {string} key
 * @return {string}
 */
export const getDownloadURL = key => {
  return `${DOWNLOAD_DOMAIN}/${key}`;
};

/**
 * @param {string} redirectURL
 * @return {string}
 */
export const getLoginURL = redirectURL => {
  return `/auth/github?redirect_uri=${encodeURIComponent(
    redirectURL || window.location.href
  )}`;
};
