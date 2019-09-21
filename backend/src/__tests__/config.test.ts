import config from '../config';

describe('app config', () => {
  it('should contains necessary config', () => {
    expect(config).toHaveProperty('env');
    expect(config).toHaveProperty('db');
    expect(config).toHaveProperty('port');
    expect(config).toHaveProperty('publicPath');
    expect(config).toHaveProperty('frontendEntry');
    expect(config).toHaveProperty('jwtSecret');
    expect(config).toHaveProperty('home');
    expect(config).toHaveProperty('keys');
  });
});
