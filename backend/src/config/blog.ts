const isDevelopment = !!process.env.CI || process.env.NODE_ENV !== 'production';

const config = {
  development: {
    owner: 'BinkiCyo',
    repo: 'blog',
    token: 'fc53e47802edc247e1ccba551a799b3110a87c79',
  },
  production: {
    owner: 'samuraime',
    repo: 'samuraime.github.io',
    token: process.env.BLOG_REPO_ACCESS_TOKEN,
  },
};

export default isDevelopment ? config.development : config.production;
