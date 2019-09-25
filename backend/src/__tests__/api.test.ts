/* eslint-disable import/first */

jest.mock('../routes/auth.ts');
jest.mock('../controllers/upload.ts');

import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';

const server = app.listen();
const mongoServer = new MongoMemoryServer();
let userCookies: string[];
let superUserCookies: string[];

beforeAll(async () => {
  const mongoUri = await mongoServer.getConnectionString();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const userRes = await request(server).get('/auth/github/callback');
  userCookies = userRes.get('Set-Cookie');

  const superUserRes = await request(server).get(
    '/auth/github/callback?superUser=yes'
  );
  superUserCookies = superUserRes.get('Set-Cookie');
}, 600000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await server.close();
});

describe('/api', () => {
  it('should response 404', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/archives', () => {
  it('should response an array', async () => {
    const res = await request(server).get('/api/archives');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// eslint-disable-next-line no-template-curly-in-string
describe('GET /api/archives/${id}', () => {
  it('should response 404 when it encounter a fake id', async () => {
    const res = await request(server).get('/api/archives/fakeid');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/archives', () => {
  it('should create an archive document', async () => {
    const archive = {
      hash: 'FiDShRv4UUKfecXNlpotyqoPbziO',
      name: 'samuraime.svg',
      size: 13402,
      type: 'image/svg+xml',
    };
    const res = await request(server)
      .post('/api/archives')
      .send(archive)
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');
    expect(res.body).toMatchObject(archive);
  });
});

describe('PUT /api/archives', () => {
  const archive = {
    hash: 'FiDShRv4UUKfecXNlpotyqoPbziO',
    name: 'samuraime.svg',
    size: 13402,
    type: 'image/svg+xml',
  };
  let id: string;

  beforeAll(async () => {
    const res = await request(server)
      .post('/api/archives')
      .send(archive)
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');
    id = res.body._id; // eslint-disable-line
  });
  it('should update an archive document', async () => {
    const res = await request(server)
      .put(`/api/archives/${id}`)
      .send({ ...archive, name: 'smr.svg' })
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');

    expect(res.body.name).toBe('smr.svg');
  });
});

describe('DELETE /api/archives', () => {
  const archive = {
    hash: 'FiDShRv4UUKfecXNlpotyqoPbziO',
    name: 'samuraime.svg',
    size: 13402,
    type: 'image/svg+xml',
  };
  let id: string;

  beforeAll(async () => {
    const res = await request(server)
      .post('/api/archives')
      .send(archive)
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');
    id = res.body._id; // eslint-disable-line
  });
  it('should update an archive document', async () => {
    // TODO: need to set a qiniu secrets
    const res = await request(server)
      .delete(`/api/archives/${id}`)
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
  });
});

describe('GET /api/yumes', () => {
  it('should response 403 when user is not signed in', async () => {
    const res = await request(server).get('/api/yumes');
    expect(res.status).toBe(403);
  });
  it('should response an array', async () => {
    const res = await request(server)
      .get('/api/yumes')
      .set('Cookie', userCookies);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('/api/upload/token', () => {
  it('should response 403 when user is not a super user', async () => {
    const res = await request(server)
      .get('/api/upload/token')
      .set('Cookie', userCookies);
    expect(res.status).toBe(403);
  });
  it('should response 200 when user is a super user', async () => {
    const res = await request(server)
      .get('/api/upload/token')
      .set('Cookie', superUserCookies);
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
  });
});
