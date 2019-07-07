const queryString = query => {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  return searchParams.toString();
};

const request = method => (endpoint, options = {}) => {
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
  const resource = query ? `${endpoint}?${queryString(query)}` : endpoint;
  return fetch(resource, finalOptions).then(async res => {
    const data = await res.json();
    if (!res.ok) {
      const { message } = data;
      throw new Error(message || res.statusText);
    }
    return data;
  });
};

export default {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};
