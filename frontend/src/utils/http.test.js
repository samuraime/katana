import http from './http';

describe('http', () => {
  it('should have RESTful methods', () => {
    expect(http).toHaveProperty('get');
    expect(http).toHaveProperty('post');
    expect(http).toHaveProperty('put');
    expect(http).toHaveProperty('delete');
  });
});
