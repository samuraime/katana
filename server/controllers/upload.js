const qiniu = require('qiniu');
const { accessKey, secretKey, policy } = require('../config/qiniu');

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const getToken = (ctx) => {
  const putPolicy = new qiniu.rs.PutPolicy(policy);
  const token = putPolicy.uploadToken(mac);
  ctx.body = {
    token,
  };
};

const destory = (key) => {
  const bucket = policy.scope;
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0;
  const bucketManager = new qiniu.rs.BucketManager(mac, config);
  return new Promise((resolve, reject) => {
    bucketManager.delete(bucket, key, (err, respBody) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(respBody);
    });
  });
};

module.exports = {
  destory,
  getToken,
};
