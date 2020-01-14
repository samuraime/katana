import { createAppStore } from '..';
import actions from './actions';
import { getArchives, deleteArchive } from '../../utils/API';
import { nextFrame } from '../promiseMiddlewareTestHelper';

jest.mock('../../utils/API');

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
