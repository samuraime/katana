import http from '../../utils/http';

describe('http', () => {
  test('should have RESTful methods', () => {
    expect(http).toHaveProperty('get');
    expect(http).toHaveProperty('post');
    expect(http).toHaveProperty('put');
    expect(http).toHaveProperty('delete');
  });
});
