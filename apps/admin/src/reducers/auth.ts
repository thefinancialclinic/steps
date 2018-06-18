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

const Storage = {
  get: key => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  },

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: key => {
    localStorage.removeItem(key);
  },
};

const initialState: State = {
  user: Storage.get('USER') || { type: null },
  isAuthenticated: Storage.get('AUTHENTICATED') || false,
};

export default (state = initialState, action): State => {
  switch (action.type) {
    case SET_USER_TYPE:
      return { ...state, user: { type: action.userType } };

    case LOGIN:
      Storage.set('USER', action.user);
      Storage.set('AUTHENTICATED', true);
      return { ...state, user: action.user, isAuthenticated: true };

    case LOGOUT:
      Storage.remove('USER');
      Storage.remove('AUTHENTICATED');
      return { ...state, user: { type: null }, isAuthenticated: false };

    default:
      return state;
  }
};
