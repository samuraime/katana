import { getLoginURL } from './login';

describe('getLoginURL', () => {
  it('should return a valid URL', () => {
    expect(typeof getLoginURL()).toBe('string');
  });
});
