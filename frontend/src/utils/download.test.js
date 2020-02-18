import download from './download';

describe('download', () => {
  it('should not throw error', () => {
    const hello = 'data:text/plain;base64,aGVsbG8%3D';
    expect(() => {
      download(hello, 'hello.txt');
    }).not.toThrow();
  });
});
