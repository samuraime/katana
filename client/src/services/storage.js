const STORAGE_KEY = 'authToken';
const storage = localStorage;

export const getAuthToken = () => storage.getItem(STORAGE_KEY);

export const setAuthToken = (token) => {
  storage.setItem(STORAGE_KEY, token);
};

export const removeAuthToken = () => {
  storage.removeItem(STORAGE_KEY);
};
