import { Middleware } from 'koa';
import qiniu from 'qiniu';
import qiniuConfig from '../config/qiniu';

const { accessKey, secretKey, policy } = qiniuConfig;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const getToken: Middleware = (ctx) => {
  const putPolicy = new qiniu.rs.PutPolicy(policy);
  const token = putPolicy.uploadToken(mac);
  ctx.body = {
    token,
  };
};

const remove = (key: string): Promise<null> => {
  const bucket = policy.scope;
  const config = new qiniu.conf.Config();
  // config.zone = qiniu.zone.Zone_z0;
  const bucketManager = new qiniu.rs.BucketManager(mac, config);
  return new Promise((resolve, reject) => {
    bucketManager.delete(bucket, key, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

export default {
  remove,
  getToken,
};
