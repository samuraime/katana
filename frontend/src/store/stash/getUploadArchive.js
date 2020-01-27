import { READY } from '../../constants/upload';

export function getTempId({ size, name, lastModified }) {
  return `${name}-${size}-${lastModified}`;
}

/**
 * @param {File} file
 */
export default function getUploadArchive(file) {
  const { size, name, type } = file;

  return {
    id: getTempId(file),
    key: '',
    hash: '',
    name,
    size,
    type,
    // following fields
    uploaded: 0,
    status: READY,
  };
}
