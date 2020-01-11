import { createAppStore } from '..';
import actions from './actions';
import {
  getYumes,
  postYume,
  putYume,
  deleteYume,
  getYumeCalendarRecords,
} from '../../utils/API';
import { nextFrame } from '../promiseMiddlewareTestHelper';

jest.mock('../../utils/API');

let store;

beforeAll(() => {
  store = createAppStore();
});

const mockYume = {
  id: '5db05a7948fe41bad9bae52a',
  text: 'dsadsa',
  interpretation: '',
  images: [],
  type: 'normal',
  tags: [],
  stars: 0,
  stargazers: [],
  public: true,
};

describe('yumeActions.getYumes', () => {
  const mockYumes = [{ ...mockYume, id: 'firstyume' }];
  it('should put yumes to state', async () => {
    getYumes.mockResolvedValueOnce(mockYumes);

    store.dispatch(actions.getYumes());
    await nextFrame();

    expect(store.getState().yume.yumes).toEqual(mockYumes);
  });
});

describe('yumeActions.createYume', () => {
  it('should add a new yume to state', async () => {
    postYume.mockResolvedValueOnce(mockYume);

    store.dispatch(actions.createYume());
    await nextFrame();

    expect(store.getState().yume.yumes[0]).toEqual(mockYume);
  });
});

describe('yumeActions.updateYume', () => {
  it('should update yume', async () => {
    const updatedYume = {
      id: '5db05a7948fe41bad9bae52a',
      text: 'hana',
      interpretation: '',
      images: [],
      type: 'normal',
      tags: [],
      stars: 0,
      stargazers: [],
      public: false,
    };
    putYume.mockResolvedValueOnce(updatedYume);

    store.dispatch(actions.updateYume());
    await nextFrame();

    expect(store.getState().yume.yumes[0]).toEqual(updatedYume);
  });
});

describe('yumeActions.deleteYume', () => {
  it('should remove the yume from state', async () => {
    const deletedYume = {
      id: '5db05a7948fe41bad9bae52a',
      text: 'hana',
      interpretation: '',
      images: [],
      type: 'normal',
      tags: [],
      stars: 0,
      stargazers: [],
      public: false,
    };
    deleteYume.mockResolvedValueOnce(deletedYume);

    store.dispatch(actions.deleteYume());
    await nextFrame();

    expect(
      store.getState().yume.yumes.find(({ id }) => id === deletedYume.id)
    ).toBe(undefined);
  });
});

describe('yumeActions.getYumeCalendar', () => {
  it('should remove the yume from state', async () => {
    const mockCalendar = [
      {
        id: '5db05a7948fe41bad9bae52a',
        type: 'normal',
        createdAt: '2019-10-23T13:49:45.122Z',
      },
      {
        id: '5d3f9507858306d1bc5eec4c',
        type: 'normal',
        createdAt: '2019-07-30T00:53:27.126Z',
      },
    ];
    getYumeCalendarRecords.mockResolvedValueOnce(mockCalendar);

    store.dispatch(actions.getYumeCalendar());
    await nextFrame();

    expect(store.getState().yume.calendarRecords).toEqual(mockCalendar);
  });
});
