function getDate(date) {
  return date instanceof Date ? date : new Date(date);
}

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
});

/**
 * @param {Date | string | number} value
 */
function formatDate(value) {
  const date = getDate(value);

  return dateTimeFormat.format(date);
}

export default formatDate;
