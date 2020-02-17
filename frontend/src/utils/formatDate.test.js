import formatDate from './formatDate';

describe('formatDate', () => {
  it('should format correctly', () => {
    // Mon, Aug 26, 2019
    expect(formatDate('2019-08-26T15:00:00.000Z')).toMatch(
      /^\w+, \w+ \d{2}, \d{4}$/
    );
  });
});
