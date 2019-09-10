import qs from 'querystring';
import fetch from 'node-fetch';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface RequestOptions {
  headers?: Record<string, string>;
  body?: Record<string, string>;
  query?: Record<string, string>;
}

const request = (method: HttpMethod) => (
  endpoint: string,
  options: RequestOptions = {}
) => {
  const { headers, body, query, ...restOptions } = options;
  const finalOptions = {
    ...restOptions,
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };
  const resource = query ? `${endpoint}?${qs.stringify(query)}` : endpoint;
  return fetch(resource, finalOptions).then(res => {
    if (res.headers.get('content-type').includes('application/json')) {
      return res.json();
    }
    return res.text();
  });
};

export default {
  get: request(HttpMethod.GET),
  post: request(HttpMethod.POST),
  put: request(HttpMethod.PUT),
  delete: request(HttpMethod.DELETE),
};
