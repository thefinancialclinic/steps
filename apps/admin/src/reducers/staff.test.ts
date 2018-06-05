import { inviteStaff } from '../actions/staff';
import reducer from './staff';

describe('Staff reducer', () => {
  it('stores invited emails', async () => {
    const initialState = {
      invitedEmails: []
    };

    const action = await inviteStaff(['one@example.com', 'two@example.com']);

    const updatedState = reducer(initialState, action);

    expect(updatedState).toEqual({
      invitedEmails: ['one@example.com', 'two@example.com']
    });
  });
});
