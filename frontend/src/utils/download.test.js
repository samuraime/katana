import download from './download';

describe('download', () => {
  it('should not throw error', async () => {
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();
    const hello = 'data:text/plain;base64,aGVsbG8%3D';

    await expect(download(hello, 'hello.txt')).resolves.toBe(undefined);
    expect(URL.createObjectURL).toBeCalled();
    expect(URL.revokeObjectURL).toBeCalled();
  });
});
