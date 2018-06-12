import { LOGIN, SET_USER_TYPE } from 'actions/auth';

export enum USER_TYPE {
  SUPER_ADMIN = 'Superadmin',
  ADMIN = 'Admin',
  COACH = 'Coach',
  CLIENT = 'Client',
}

export interface User {
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
}

export interface State {
  user: null | User;
}

const initialState: State = {
  user: { type: null },
};

export default (state = initialState, action): State => {
  switch (action.type) {
    case SET_USER_TYPE:
      return { ...state, user: { type: action.userType } };

    case LOGIN:
      return { ...state, user: action.user };

    default:
      return state;
  }
};
