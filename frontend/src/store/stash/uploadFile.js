import { upload } from 'qiniu-browser';
import { getUploadToken } from '../../utils/API';
import { UPLOAD_HOST } from '../../constants/upload';

export default function uploadFile(file, { onProgress }) {
  return upload(file, {
    host: UPLOAD_HOST,
    token: async () => {
      const { token } = await getUploadToken();
      return token;
    },
    getKey() {
      return process.env.NODE_ENV === 'production'
        ? ''
        : `TEST/${Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase()}`;
    },
    onProgress,
  });
}
