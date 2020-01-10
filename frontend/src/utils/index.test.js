import { getDownloadURL, getLoginURL } from '.';

describe('getDownloadURL', () => {
  it('should return a valid URL', () => {
    expect(typeof getDownloadURL()).toBe('string');
  });
});

describe('getLoginURL', () => {
  it('should return a valid URL', () => {
    expect(typeof getLoginURL()).toBe('string');
  });
});
