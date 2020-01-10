import { createAppStore } from '..';
import actions from './actions';
import reducer from './reducer';
import { getUser, signOut } from '../../utils/API';

jest.mock('../../utils/API');

// need to wait fulfilled and rejected actions
const nextFrame = () => new Promise(resolve => setTimeout(resolve));

const mockUser = {
  avatar: 'https://avatars1.githubusercontent.com/u/2203205?v=4',
  email: 'samurai7@foxmail.com',
  login: 'samuraime',
  name: 'SamuraiMe',
  superUser: true,
  createdAt: '2019-07-24T12:58:06.012Z',
  updatedAt: '2019-07-24T12:58:06.012Z',
  githubID: 2203205,
  id: '5d3855de978cd85940a8b982',
};

describe('userActions.init', () => {
  it('should set `signedIn` to false if no payload', () => {
    const state = reducer(undefined, actions.init());

    expect(state.signedIn).toBe(false);
  });

  it('should update state if it has payload', () => {
    const state = reducer(undefined, actions.init(mockUser));

    expect(state.signedIn).toBe(true);
  });
});

describe('userActions.getUser', () => {
  it('should set `signedIn` to false if request success', async () => {
    getUser.mockResolvedValueOnce(mockUser);
    const store = createAppStore();

    store.dispatch(actions.getUser());
    await nextFrame();

    expect(store.getState().user.signedIn).toBe(true);
  });

  it('should set `signedIn` to false if request fail', async () => {
    getUser.mockRejectedValueOnce();
    const store = createAppStore();

    store.dispatch(actions.init(mockUser));
    store.dispatch(actions.getUser()).catch(() => {
      // https://pburtchaell.gitbook.io/redux-promise-middleware/guides/rejected-promises
      // swallow the error of rejected Promsie
    });
    await nextFrame();

    expect(store.getState().user.signedIn).toBe(false);
  });
});

describe('userActions.signOut', () => {
  it('should update `title` field', async () => {
    signOut.mockResolvedValueOnce();
    const store = createAppStore();

    store.dispatch(actions.signOut());
    await nextFrame();

    expect(store.getState().user.signedIn).toBe(false);
  });
});
