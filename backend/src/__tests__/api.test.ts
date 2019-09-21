import request from 'supertest';
import app from '..';

describe('API routes', () => {
  it('should response 404', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(404);
  });

  // TODO: how to mock db operation?
  // test('#archives.list should response array', async () => {
  //   const res = await request(app).get('/api/archives');
  //   expect(Array.isArray(res.body)).toBe(true);
  // });

  test('#archives.find should response 404 when it encounter a fake id', async () => {
    const res = await request(app).get('/api/archives/fakeid');
    expect(res.status).toBe(404);
  });

  test('#archives.find should response 404 when it encounter a fake id', async () => {
    const res = await request(app).get('/api/archives/fakeid');
    expect(res.status).toBe(404);
  });

  it('should not allow users to access yumes', async () => {
    const res = await request(app).get('/api/yumes');
    expect(res.status).toBe(403);
  });

  it('should only allow super users to get upload token', async () => {
    const res = await request(app).get('/api/upload/token');
    expect(res.status).toBe(403);
  });
});
