import {
  INVITE_STAFF,
  SET_COACHES,
  DELETE_COACH,
  UPDATE_PERMISSIONS,
} from 'actions/staff';
import { User } from './auth';
import moment from 'moment';

export type InvitedCoach = {
  email: string;
  updated_at: moment.Moment;
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
    case DELETE_COACH:
      return {
        ...state,
        coaches: state.coaches.filter(coach => coach.id !== action.id),
      };
    case UPDATE_PERMISSIONS:
      return {
        ...state,
        coaches: state.coaches.map(coach => {
          if (coach.id === action.id) {
            return {
              ...coach,
              type: action.role,
            };
          }
          return coach;
        }),
      };
    default:
      return state;
  }
};
