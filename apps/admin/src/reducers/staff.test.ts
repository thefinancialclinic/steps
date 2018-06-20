import moment from 'moment';
import { INVITE_STAFF } from '../actions/staff';
import reducer from './staff';

describe('Staff reducer', () => {
  it('stores invited emails', async () => {
    const date1 = moment.utc();
    const date2 = moment.utc();
    const initialState = { invitedCoaches: [], coaches: [] };
    const mockAction = {
      type: INVITE_STAFF,
      invitedCoaches: [
        { email: 'one@example.com', updated: date1 },
        { email: 'two@example.com', updated: date2 },
      ],
    };

    const { coaches } = reducer(initialState, mockAction);

    expect(coaches).toMatchObject([
      {
        email: 'one@example.com',
        updated: date1,
      },
      {
        email: 'two@example.com',
        updated: date2,
      },
    ]);
  });
});
