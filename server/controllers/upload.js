const qiniu = require('qiniu');
const { accessKey, secretKey, policy } = require('../config/qiniu');

const getToken = (ctx) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const putPolicy = new qiniu.rs.PutPolicy(policy);
  const token = putPolicy.uploadToken(mac);
  ctx.body = {
    token,
  };
};

module.exports = {
  getToken,
};
