import { upload } from 'qiniu-browser';
import { createAppStore } from '..';
import actions from './actions';
import {
  getArchives,
  deleteArchive,
  postArchive,
  getUploadToken,
} from '../../utils/API';
import { delay } from '../../utils';
import { nextFrame } from '../promiseMiddlewareTestHelper';

jest.mock('../../utils/API');
jest.mock('qiniu-browser');

let store;

beforeAll(() => {
  store = createAppStore();
});

describe('stashActions.getYumes', () => {
  const mockArchives = [
    {
      id: '5d63d09f997866e7cac1f9df',
      name: '0_S6BD6E2-IldA21J-.jpg',
      size: 174832,
      type: 'image/jpeg',
      key: 'TEST/JQ52IDGDAOK',
      hash: 'Ftf07dcsY1aLIkA9BvfMA_D-b0UT',
      createdAt: '2019-08-26T12:29:19.155Z',
      updatedAt: '2019-08-26T12:29:19.155Z',
      link: 'http://cdn-katana.samuraime.com/TEST/JQ52IDGDAOK',
    },
    {
      id: '5d63d042997866e7cac1f9de',
      name: '0_S6BD6E2-IldA21J-.jpg',
      size: 174832,
      type: 'image/jpeg',
      key: 'TEST/WVX56ZXEUQD',
      hash: 'Ftf07dcsY1aLIkA9BvfMA_D-b0UT',
      createdAt: '2019-08-26T12:27:46.071Z',
      updatedAt: '2019-08-26T12:27:46.071Z',
      link: 'http://cdn-katana.samuraime.com/TEST/WVX56ZXEUQD',
    },
  ];
  it('should put archives to state', async () => {
    getArchives.mockResolvedValueOnce(mockArchives);

    store.dispatch(actions.getArchives());
    await nextFrame();

    expect(store.getState().stash.archives).toEqual(mockArchives);
  });
});

describe('stashActions.deleteArchive', () => {
  it('should remove deleted archive from state', async () => {
    deleteArchive.mockResolvedValueOnce({
      id: '5d63d09f997866e7cac1f9df',
      name: '0_S6BD6E2-IldA21J-.jpg',
      size: 174832,
      type: 'image/jpeg',
      key: 'TEST/JQ52IDGDAOK',
      hash: 'Ftf07dcsY1aLIkA9BvfMA_D-b0UT',
      createdAt: '2019-08-26T12:29:19.155Z',
      updatedAt: '2019-08-26T12:29:19.155Z',
      link: 'http://cdn-katana.samuraime.com/TEST/JQ52IDGDAOK',
    });

    store.dispatch(actions.deleteArchive());
    await nextFrame();
    const deletedItem = store
      .getState()
      .stash.archives.find(({ id }) => id === '5d63d09f997866e7cac1f9df');

    expect(deletedItem).toBe(undefined);
  });
});

describe('stashActions.appendArchives', () => {
  it('should remove deleted archive from state', async () => {
    const newArchives = [
      {
        id: 'temp_id_1',
        name: 'haha.jpg',
        size: 174832,
        type: 'image/jpeg',
        key: '',
        hash: '',
      },
      {
        id: 'temp_id_2',
        name: 'haha.png',
        size: 174832,
        type: 'image/png',
        key: '',
        hash: '',
      },
    ];

    store.dispatch(actions.appendArchives(newArchives));

    const updatedArchives = store.getState().stash.archives;
    expect(updatedArchives.find(({ id }) => id === 'temp_id_1')).toBeDefined();
    expect(updatedArchives.find(({ id }) => id === 'temp_id_2')).toBeDefined();
  });
});

describe('stashActions.appendNewArchives', () => {
  it('should fail to append new archives', async () => {
    getUploadToken.mockResolvedValueOnce({ token: 'token' });
    upload.mockImplementationOnce((file, options) => {
      return new Promise(resolve => {
        setTimeout(() => {
          options.onProgress(10);
          resolve({
            key: 'TEST/1RXFKKGDV0C',
            hash: 'FukVE6cK9fOs4O8tNzqd6OjAxZBe',
          });
        });
      });
    });
    postArchive.mockRejectedValueOnce({ message: 'Oops' });

    const files = [
      new File(['I will be an error'], 'error.txt', {
        type: 'text/plain',
      }),
    ];
    store.dispatch(actions.appendNewArchives(files));
    await delay();
    await delay();
    const newArchive = store.getState().stash.archives.find(archive => {
      return archive.name === 'error.txt';
    });

    expect(newArchive).toBeDefined();
    expect(newArchive.status).toBe('ERROR');
  });

  it('should append new archives successfully', async () => {
    getUploadToken.mockResolvedValueOnce({ token: 'token' });
    upload.mockImplementationOnce((file, options) => {
      return new Promise(resolve => {
        setTimeout(() => {
          options.onProgress(10);
          resolve({
            key: 'TEST/1RXFKKGDV0C',
            hash: 'FukVE6cK9fOs4O8tNzqd6OjAxZBe',
          });
        });
      });
    });
    postArchive.mockResolvedValueOnce({
      id: '5e2eefbe2b0ddaad36f9b686',
      name: 'demacia.txt',
      size: 12,
      type: 'text/plain',
      key: 'TEST/1RXFKKGDV0C',
      hash: 'FukVE6cK9fOs4O8tNzqd6OjAxZBe',
      updatedAt: '2020-01-27T14:12:14.243Z',
      createdAt: '2020-01-27T14:12:14.243Z',
    });

    const files = [
      new File(['I am content'], 'demacia.txt', {
        type: 'text/plain',
      }),
    ];
    store.dispatch(actions.appendNewArchives(files));
    let newArchive = store.getState().stash.archives.find(archive => {
      return archive.name === 'demacia.txt';
    });

    expect(newArchive).toBeDefined();
    expect(newArchive.status).toBe('UPLOADING');

    await delay();
    await delay();
    newArchive = store.getState().stash.archives.find(archive => {
      return (
        archive.name === 'demacia.txt' &&
        archive.hash === 'FukVE6cK9fOs4O8tNzqd6OjAxZBe'
      );
    });

    expect(newArchive).toBeDefined();
    expect(newArchive.status).toBe('DONE');
  });
});
