import actions from './actions';
import reducer from './reducer';

describe('appActions.setTitle', () => {
  it('should update `title` field', () => {
    const state = reducer(undefined, actions.setTitle({ title: 'hana' }));

    expect(state.title).toBe('hana');
  });
});
