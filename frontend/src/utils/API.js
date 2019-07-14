import http from './http';

export const getUser = () => http.get('/api/user');

export const signOut = () => http.get('/api/signout');

export const getUploadToken = () => http.get('/api/upload/token');

export const getArchives = () => http.get('/api/archives');
export const postArchive = archive =>
  http.post(`/api/archives`, {
    body: archive,
  });
export const deleteArchive = id => http.delete(`/api/archives/${id}`);
