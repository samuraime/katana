import { DOWNLOAD_DOMAIN } from '../constants/upload';

export const noop = () => {};

/**
 * @param {string} key
 * @return {string}
 */
export const getDownloadLink = key => {
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
