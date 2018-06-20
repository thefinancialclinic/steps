import { INVITE_STAFF, SET_COACHES } from 'actions/staff';
import { User } from './auth';
import moment from 'moment';

export type InvitedCoach = {
  email: string;
  updated: moment.Moment;
};

export interface StaffState {
  coaches: User[];
}

const initialState: StaffState = {
  coaches: [] as User[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COACHES:
      return {
        ...state,
        coaches: action.coaches,
      };
    case INVITE_STAFF:
      return {
        ...state,
        coaches: [...state.coaches, ...action.invitedCoaches],
      };
    default:
      return state;
  }
};
