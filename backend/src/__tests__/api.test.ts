import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';

const server = app.listen();
const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  const mongoUri = await mongoServer.getConnectionString();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 600000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await server.close();
});

describe('API routes', () => {
  it('should response 404', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(404);
  });

  test('#archives.list should response array', async () => {
    const res = await request(server).get('/api/archives');
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('#archives.find should response 404 when it encounter a fake id', async () => {
    const res = await request(server).get('/api/archives/fakeid');
    expect(res.status).toBe(404);
  });

  test('#archives.find should response 404 when it encounter a fake id', async () => {
    const res = await request(server).get('/api/archives/fakeid');
    expect(res.status).toBe(404);
  });

  it('should not allow users to access yumes', async () => {
    const res = await request(server).get('/api/yumes');
    expect(res.status).toBe(403);
  });

  it('should only allow super users to get upload token', async () => {
    const res = await request(server).get('/api/upload/token');
    expect(res.status).toBe(403);
  });
});
