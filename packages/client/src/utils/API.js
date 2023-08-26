import http from './http';

export const getUser = () => http.get('/api/user');

export const signOut = () => http.get('/api/signout');

export const getUploadToken = () => http.get('/api/upload/token');

export const getArchives = () => http.get('/api/archives');
export const postArchive = (archive) =>
  http.post(`/api/archives`, {
    json: archive,
  });
export const deleteArchive = (id) => http.delete(`/api/archives/${id}`);

export const getYumes = () => http.get('/api/yumes');
export const postYume = (yume) => http.post('/api/yumes', { json: yume });
export const putYume = (yume) => http.put('/api/yumes', { json: yume });
export const deleteYume = (id) => http.delete(`/api/yumes/${id}`);
export const getYumeCalendarRecords = () => http.get(`/api/yumes/calendar`);
