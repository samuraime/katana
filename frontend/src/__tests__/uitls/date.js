import { dateEn } from '../../utils/date';

describe('dateEn', () => {
  test('should format date correctly', () => {
    expect(dateEn('2019-08-26T15:00:00.000Z')).toBe('Aug 26, 2019');
    expect(dateEn(new Date('2019-09-01'))).toBe('Sep 1, 2019');
  });
});
