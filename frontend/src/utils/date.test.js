import { format } from './date';

describe('date', () => {
  it('should format english date correctly', () => {
    const formatEn = format('en');
    expect(formatEn('2019-08-26T15:00:00.000Z')).toBe('Aug 26, 2019');
    expect(formatEn(new Date('2019-09-01'))).toBe('Sep 1, 2019');
  });
});
