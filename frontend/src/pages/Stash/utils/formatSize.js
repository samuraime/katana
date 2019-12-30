/**
 * @param {number} size
 * @return {string}
 */
export default function formatSize(size) {
  const units = ['GB', 'MB', 'KB', 'B'];
  const len = units.length;
  let byte = Number.parseInt(size, 10);

  if (Number.isNaN(byte)) {
    throw new TypeError('size must be a `number`');
  }

  const sizes = units.map((unit, index) => {
    const unitSize = 2 ** ((len - index - 1) * 10);
    const v = Math.floor(byte / unitSize);
    byte %= unitSize;
    return v;
  });

  const nonZeroIndex = sizes.findIndex(Boolean);
  if (nonZeroIndex === -1) {
    return '0B';
  }
  if (nonZeroIndex === len - 1) {
    return `${sizes.slice(-1)}${units.slice(-1)}`;
  }
  let v = sizes[nonZeroIndex] + sizes[nonZeroIndex + 1] / 1024;
  v = v.toFixed(2);
  v += units[nonZeroIndex];
  return v;
}
