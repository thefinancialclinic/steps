import { DispatchFn } from 'actions/types';
import api from 'api';
import moment from 'moment';
import { User, USER_TYPE } from 'reducers/auth';

export const SET_COACHES = 'SET_COACHES';
export const setCoaches = coaches => {
  return {
    type: SET_COACHES,
    coaches,
  };
};

export const getCoaches = (): DispatchFn => async dispatch => {
  try {
    const { data } = await api.get('/coaches');
    return dispatch(setCoaches(data));
  } catch (err) {
    return Promise.reject(err);
  }
};

export const INVITE_STAFF = 'INVITE_STAFF';
export const inviteStaff = async (emails: string[]) => {
  // TODO: send API request
  const invitedCoaches: User[] = emails.map(email => {
    return {
      email,
      updated_at: moment.utc().toLocaleString(),
      type: USER_TYPE.PENDING_INVITE,
    };
  });
  return {
    type: INVITE_STAFF,
    invitedCoaches,
  };
};

export const resendInvite = async (email: string) => {
  // TODO: send API request
};

export const UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS';
export const updatePermissions = async (coachId: number, role: USER_TYPE) => {
  // TODO: update user via API
  return {
    type: UPDATE_PERMISSIONS,
    id: coachId,
    role,
  };
};

export const DELETE_COACH = 'DELETE_COACH';
export const deleteCoach = async (coachId: number) => {
  // This should work once cascade delete works in the API
  try {
    await api.delete(`/coaches/${coachId}`);
    return {
      type: DELETE_COACH,
      id: coachId,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
