import { USER_TYPE } from 'reducers/auth';
import { DELETE_COACH, UPDATE_PERMISSIONS } from './../actions/staff';
import moment from 'moment';
import { INVITE_STAFF } from '../actions/staff';
import reducer from './staff';

describe('Staff reducer', () => {
  it('stores invited emails', () => {
    const date1 = moment.utc();
    const date2 = moment.utc();
    const initialState = { coaches: [] };
    const mockAction = {
      type: INVITE_STAFF,
      invitedCoaches: [
        { email: 'one@example.com', updated_at: date1 },
        { email: 'two@example.com', updated_at: date2 },
      ],
    };

    const { coaches } = reducer(initialState, mockAction);

    expect(coaches).toEqual([
      {
        email: 'one@example.com',
        updated_at: date1,
      },
      {
        email: 'two@example.com',
        updated_at: date2,
      },
    ]);
  });

  it('deletes a coach', () => {
    const initialState = {
      coaches: [
        {
          email: 'test@example.com',
          id: 1,
          type: USER_TYPE.COACH,
        },
      ],
    };
    const mockAction = {
      type: DELETE_COACH,
      id: 1,
    };

    const { coaches } = reducer(initialState, mockAction);

    expect(coaches.length).toEqual(0);
  });

  it('updates permissions for a user', () => {
    const initialState = {
      coaches: [
        {
          email: 'test@example.com',
          id: 1,
          type: USER_TYPE.COACH,
        },
      ],
    };
    const mockAction = {
      type: UPDATE_PERMISSIONS,
      id: 1,
      role: USER_TYPE.ADMIN,
    };

    const { coaches } = reducer(initialState, mockAction);

    expect(coaches[0]).toEqual({
      email: 'test@example.com',
      id: 1,
      type: USER_TYPE.ADMIN,
    });
  });
});
