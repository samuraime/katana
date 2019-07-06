const qs = require('querystring');
const fetch = require('node-fetch');

const request = method => (endpoint, options) => {
  const { headers, body, query, restOptions } = options;
  const finalOptions = {
    ...restOptions,
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body || JSON.stringify(body),
  };
  const resource = query ? `${endpoint}?${qs.stringify(query)}` : endpoint;
  return fetch(resource, finalOptions).then(res => res.json());
};

module.exports = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};