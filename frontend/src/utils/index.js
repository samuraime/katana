/* eslint-disable import/prefer-default-export */
import { DOWNLOAD_DOMAIN } from '../constants/upload';

export const noop = () => {};

export const getDownloadLink = key => {
  return `${DOWNLOAD_DOMAIN}/${key}`;
};
