import ky from 'ky-universal';

const normalize = object => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(normalize);
  }

  const normalized = {};
  Object.keys(object).forEach(key => {
    if (key === '_id') {
      normalized.id = object[key];
      return;
    }
    normalized[key] = normalize(object[key]);
  });

  return normalized;
};

const requestMethods = ['get', 'post', 'put', 'delete'];

const http = {};

const kyInstance = ky.extend({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

requestMethods.forEach(method => {
  http[method] = async (input, options) => {
    const response = kyInstance[method](input, options);
    const data = await response.json();
    return normalize(data);
  };
});

export default http;
