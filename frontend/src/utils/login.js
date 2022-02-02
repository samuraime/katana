/* eslint-disable import/prefer-default-export */

/**
 * @param {string} redirectURL
 * @return {string}
 */
export const getLoginURL = (redirectURL) => {
  return `/auth/github?redirect_uri=${encodeURIComponent(
    redirectURL || window.location.href
  )}`;
};
