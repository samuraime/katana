/* eslint-disable import/first */

jest.mock('../routes/auth.ts');

import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';

const server = app.listen();
const mongoServer = new MongoMemoryServer();
let userCookies: string[];

beforeAll(async () => {
  const mongoUri = await mongoServer.getConnectionString();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const res = await request(server).get('/auth/github/callback');
  userCookies = res.get('Set-Cookie');
}, 600000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await server.close();
});

describe('GET /', () => {
  it('should response SPA HTML', async () => {
    const res = await request(server).get('/stash');
    expect(res.status).toBe(200);
  });

  it('should rendered by cached HTML', async () => {
    const res = await request(server).get('/stash');
    expect(res.status).toBe(200);
  });

  it('should response HTML that includes preload state', async () => {
    const res = await request(server).get('/').set('Cookie', userCookies);
    expect(res.text).toMatch(/window\.__PRELOADED_STATE__={.+}/);
  });
});

describe('GET /preloadState.js', () => {
  it('should response script', async () => {
    const res = await request(server).get('/preloadState.js');
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/javascript');
  });
});
