import formatSize from './formatSize';

describe('formatSize', () => {
  it('should throw error', () => {
    expect(() => formatSize('hah')).toThrow();
    expect(() => formatSize({})).toThrow();
    expect(() => formatSize(false)).toThrow();
  });

  it('should return correct formatted value', () => {
    expect(formatSize(0)).toBe('0B');
    expect(formatSize(1024)).toBe('1.00KB');
    expect(formatSize(1234)).toBe('1.21KB');
    expect(formatSize(1048576)).toBe('1.00MB');
    expect(formatSize(1073741824)).toBe('1.00GB');
    expect(formatSize(10737418240)).toBe('10.00GB');
  });
});
