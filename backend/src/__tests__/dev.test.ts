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
    useFindAndModify: false,
  });
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await server.close();
});

describe('GET /dev/long-live-the-code', () => {
  it('should response valid SVG', async () => {
    const res = await request(server).get('/dev/long-live-the-code');

    expect(res.get('Content-Type')).toBe('image/svg+xml');
  });
});
