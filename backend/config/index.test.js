const config = require('./');

it('should contains necessary config', () => {
  expect(config).toHaveProperty('env');
  expect(config).toHaveProperty('frontendEntry');
  expect(config).toHaveProperty('jwtSecret');
  expect(config).toHaveProperty('staticPath');
});
