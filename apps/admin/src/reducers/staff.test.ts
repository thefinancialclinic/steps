import { inviteStaff } from '../actions/staff';
import reducer from './staff';

describe('Staff reducer', () => {
  it('stores invited emails', async () => {
    const action = await inviteStaff(['one@example.com', 'two@example.com']);

    const updatedState = reducer([], action);

    expect(updatedState).toMatchObject([
      {
        email: 'one@example.com',
        pendingInvite: true
      },
      {
        email: 'two@example.com',
        pendingInvite: true
      }
    ]);
  });
});
