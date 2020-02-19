import { delay } from './misc';

describe('delay', () => {
  it('should return a valid URL', async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(99);
  });
});
