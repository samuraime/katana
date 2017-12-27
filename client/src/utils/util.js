export const stringify = (params) => {
  if (typeof params !== 'object') {
    return '';
  }
  return Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
};

export default {};
