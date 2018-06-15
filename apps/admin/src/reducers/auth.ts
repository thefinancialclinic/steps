import { LOGIN, LOGOUT, SET_USER_TYPE } from 'actions/auth';

export enum USER_TYPE {
  SUPER_ADMIN = 'Superadmin',
  ADMIN = 'Admin',
  COACH = 'Coach',
  CLIENT = 'Client',
}

export type Org = {
  id?: number;
  name: string;
  sms_number: string;
  logo?: string;
};

export type User = {
  checkin_times?: any;
  coach_id?: number;
  color?: string;
  email?: string;
  first_name?: string;
  follow_up_date?: any;
  goals?: any;
  id?: number;
  image?: any;
  last_name?: string;
  org_id?: number;
  phone?: string;
  plan_url?: string;
  platform?: string;
  status?: string;
  type: null | USER_TYPE;
  updated?: string;
  org?: Org;
};

export interface State {
  user: null | User;
  isAuthenticated: boolean;
}

const initialState: State = {
  user: { type: null },
  isAuthenticated: false,
};

export default (state = initialState, action): State => {
  switch (action.type) {
    case SET_USER_TYPE:
      return { ...state, user: { type: action.userType } };

    case LOGIN:
      return { ...state, user: action.user, isAuthenticated: true };

    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };

    default:
      return state;
  }
};
