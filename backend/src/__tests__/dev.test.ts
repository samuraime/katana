import request from 'supertest';
import app from '../app';

const server = app.listen();

describe('GET /dev/long-live-the-code', () => {
  it('should response valid SVG', async () => {
    const res = await request(server).get('/dev/long-live-the-code');

    expect(res.get('Content-Type')).toBe('image/svg+xml');
  });
});
