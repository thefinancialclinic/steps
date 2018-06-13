import { setGoals } from '../actions/goals';
import reducer from './goals';

describe('goals reducer', () => {
  it('sets goals', () => {
    const action = setGoals([{ text: 'my goal' }, { text: 'my second goal' }]);

    const updatedState = reducer([], action);

    expect(updatedState).toMatchObject([
      { text: 'my goal' },
      { text: 'my second goal' },
    ]);
  });
});
