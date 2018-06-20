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
      updated: moment.utc().toLocaleString(),
      type: USER_TYPE.PENDING_INVITE,
    };
  });
  return {
    type: INVITE_STAFF,
    invitedCoaches,
  };
};

export const DELETE_COACH = 'DELETE_COACH';
export const deleteCoach = (coachId: number): DispatchFn => async (
  dispatch,
  getState,
) => {
  // This should work once cascade delete works in the API
  try {
    await api.delete(`/coaches/${coachId}`);
    const coaches = getState().auth.coaches;
    const newCoaches = coaches.filter(coach => {
      return coach.id !== coachId;
    });
    return dispatch(setCoaches(newCoaches));
  } catch (err) {
    return Promise.reject(err);
  }
};
