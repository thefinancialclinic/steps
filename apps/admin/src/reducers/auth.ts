import { SET_USER_TYPE } from 'actions/auth';

export enum USER_TYPE {
  SUPER_ADMIN = 'Superadmin',
  ADMIN = 'Admin',
  COACH = 'Coach',
  CLIENT = 'Client',
}

export interface State {
  type: null | USER_TYPE;
}

const initialState: State = {
  type: null,
};

export default (state = initialState, action): State => {
  switch (action.type) {
    case SET_USER_TYPE:
      return { ...state, type: action.userType };

    default:
      return state;
  }
};
