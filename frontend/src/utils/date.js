/**
 * @param {string} language
 */
export function format(language) {
  const formatMap = {
    en: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    default: new Intl.DateTimeFormat('fr-CA'),
  };
  const intlFormat = formatMap[language] || formatMap.default;

  /**
   * @param {Date | string | number} date
   * @return {string}
   */
  function formatDate(date) {
    return intlFormat.format(date instanceof Date ? date : new Date(date));
  }

  return formatDate;
}

export default format();
