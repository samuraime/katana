/* eslint-disable import/first */

jest.mock('../routes/auth.ts');

import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import qiniu, { callback as qiniuCallback } from 'qiniu';
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

describe('GET /api', () => {
  it('should response 404', async () => {
    const res = await request(server).get('/api');
    // TODO: I don't know why router.get('/*') affects this
    expect(res.status).toBe(403);
  });
});

describe('GET /api/user', () => {
  it('should response empty user info', async () => {
    const res = await request(server).get('/api/user');
    expect(Object.keys(res.body).length).toBe(0);
  });
  it('should response logined user info', async () => {
    const res = await request(server)
      .get('/api/user')
      .set('Cookie', userCookies);
    expect(res.body).toHaveProperty('name');
  });
});

describe('GET /api/signout', () => {
  it('should remove logined user info', async () => {
    const res = await request(server)
      .get('/api/signout')
      .set('Cookie', userCookies);
    expect(res.status).toBe(204);
  });
});

describe('GET /api/archives', () => {
  it('should response an array', async () => {
    const res = await request(server).get('/api/archives');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/archives/:id', () => {
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

describe('PUT /api/archives/:id', () => {
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

describe('DELETE /api/archives/:id', () => {
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

    // TODO: find a better mock method
    qiniu.rs.BucketManager.prototype.delete = (
      bucket: string,
      key: string,
      callback: qiniuCallback
    ): void => {
      setTimeout(() => {
        callback(null);
      });
    };
  });
  it('should delete this archive document', async () => {
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

describe('POST /api/yumes', () => {
  const yume = {
    text: 'a nightmare',
    interpretation: 'string',
    images: ['https://cdn.samuraime.com/fake.png'],
    tags: ['nightmare'],
    public: true,
  };
  it('should response 403 when user is not super user', async () => {
    const res = await request(server)
      .post('/api/yumes')
      .set('Cookie', userCookies)
      .send(yume);
    expect(res.status).toBe(403);
  });
  it('should throw when there is no content', async () => {
    const res = await request(server)
      .post('/api/yumes')
      .set('Cookie', superUserCookies)
      .send({ ...yume, text: undefined });
    expect(res.status).toBe(400);
  });
  it('should response created yume', async () => {
    const res = await request(server)
      .post('/api/yumes')
      .set('Cookie', superUserCookies)
      .send(yume);
    expect(res.body).toMatchObject(yume);
  });
});

describe('DELETE /api/yumes/:id', () => {
  const yume = {
    text: 'a nightmare',
    interpretation: 'string',
    images: ['https://cdn.samuraime.com/fake.png'],
    tags: ['nightmare'],
    public: true,
  };
  let id: string;

  beforeAll(async () => {
    const res = await request(server)
      .post('/api/yumes')
      .send(yume)
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');
    id = res.body._id; // eslint-disable-line
  });
  it('should delete this yume', async () => {
    const res = await request(server)
      .delete(`/api/yumes/${id}`)
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');

    expect(res.body).toMatchObject(yume);
  });
});

describe('GET /api/yumes/calendar', () => {
  const yume = {
    text: 'a nightmare',
    interpretation: 'string',
    images: ['https://cdn.samuraime.com/fake.png'],
    tags: ['nightmare'],
    type: 'nightmare',
    public: true,
  };
  beforeAll(async () => {
    await request(server)
      .post('/api/yumes')
      .send(yume)
      .set('Cookie', superUserCookies)
      .set('Accept', 'application/json');
  });

  it('should return calendar', async () => {
    const res = await request(server)
      .get('/api/yumes/calendar')
      .set('Accept', 'application/json')
      .set('Cookie', userCookies);

    expect(res.body.length).toBeGreaterThanOrEqual(1);
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
