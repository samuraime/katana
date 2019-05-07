module.exports = {
  accessKey: process.env.QINIU_ACCESS_KEY,
  secretKey: process.env.QINIU_SECRET_KEY,
  policy: {
    scope: 'mimosa', // bucket
    expires: 86400,
  },
  domain: 'http://ot7pceyp2.bkt.clouddn.com',
};
