/**
 * @jest-environment node
 */

import createTestServer from 'create-test-server';
import http from './http';

describe('http', () => {
  let server;

  beforeEach(async () => {
    server = await createTestServer();
  }, 60000);

  afterEach(async () => {
    await server.close();
  });

  test('http.get', async () => {
    server.get('/', (request, response) => {
      response.end(JSON.stringify('ok'));
    });
    const result = await http.get(server.url);
    expect(result).toBe('ok');
  });

  test('http.get should replace _id of mongoose document to id', async () => {
    server.get('/', (request, response) => {
      const doc = {
        _id: 'abc',
        name: 'demacia',
      };
      response.end(JSON.stringify(doc));
    });
    const result = await http.get(server.url);
    expect(result).toStrictEqual({
      id: 'abc',
      name: 'demacia',
    });
  });

  test('http.post', async () => {
    server.post('/', (request, response) => {
      response.end(JSON.stringify('ok'));
    });
    const result = await http.post(server.url);
    expect(result).toBe('ok');
  });

  test('http.put', async () => {
    server.put('/', (request, response) => {
      response.end(JSON.stringify('ok'));
    });
    const result = await http.put(server.url);
    expect(result).toBe('ok');
  });

  test('http.delete', async () => {
    server.delete('/', (request, response) => {
      response.end(JSON.stringify('ok'));
    });
    const result = await http.delete(server.url);
    expect(result).toBe('ok');
  });
});
