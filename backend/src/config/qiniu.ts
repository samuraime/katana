export default {
  accessKey: process.env.QINIU_ACCESS_KEY,
  secretKey: process.env.QINIU_SECRET_KEY,
  policy: {
    scope: 'mimosa', // bucket
    expires: 86400,
  },
  domain: 'https://cdn-katana.samuraime.com',
};
