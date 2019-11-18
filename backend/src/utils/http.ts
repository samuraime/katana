import qs from 'querystring';
import fetch from 'node-fetch';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface HttpRequestOptions {
  headers?: Record<string, string>;
}

export const request = (method: HttpMethod) => (
  endpoint: string,
  params?: Record<string, any>,
  options: HttpRequestOptions = {}
) => {
  const { headers, ...restOptions } = options;
  const isGet = method === HttpMethod.GET;
  const finalOptions = {
    ...restOptions,
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: isGet ? undefined : JSON.stringify(params),
  };
  const resource = isGet ? `${endpoint}?${qs.stringify(params)}` : endpoint;

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
