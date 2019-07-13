const queryString = query => {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  return searchParams.toString();
};

// eslint-disable-next-line no-underscore-dangle
const normalize = object => {
  if (typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(normalize);
  }

  const { _id: id, ...others } = object;

  return { ...others, id };
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
    body: typeof body === 'object' ? JSON.stringify(body) : body,
  };
  const resource = query ? `${endpoint}?${queryString(query)}` : endpoint;
  return fetch(resource, finalOptions).then(async res => {
    const data = await res.json();
    if (!res.ok) {
      const { message } = data;
      throw new Error(message || res.statusText);
    }
    return normalize(data);
  });
};

export default {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};
