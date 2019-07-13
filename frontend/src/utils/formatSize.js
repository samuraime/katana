export default function formatSize(size) {
  const units = ['GB', 'MB', 'KB', 'B'];
  const len = units.length;
  let byte = Number.parseInt(size, 10);

  if (Number.isNaN(byte)) {
    throw new TypeError('size must be a Number');
  }

  const sizes = units.map((unit, index) => {
    const unitSize = 2 ** ((len - index - 1) * 10);
    const v = Math.floor(byte / unitSize);
    byte %= unitSize;
    return v;
  });

  const nonZeroIndex = sizes.findIndex(s => !!s);
  if (nonZeroIndex === -1) {
    return 0;
  }
  if (nonZeroIndex === len - 1) {
    return `${sizes.slice(-1)}${units.slice(-1)}`;
  }
  let v = sizes[nonZeroIndex] + sizes[nonZeroIndex + 1] / 1000;
  v = v.toFixed(2);
  v += units[nonZeroIndex];
  return v;
}
