const enFormat = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function dateEn(date) {
  return enFormat.format(date instanceof Date ? date : new Date(date));
}

export function dateZh() {}
