import { SET_USER_TYPE } from 'actions/auth';

export enum USER_TYPE {
  ADMIN,
  COACH,
  CLIENT,
}

export interface State {
  type: null | USER_TYPE;
}

const initialState: State = {
  type: USER_TYPE.ADMIN,
};

export default (state = initialState, action): State => {
  switch (action.type) {
    case SET_USER_TYPE:
      return { ...state, type: action.userType };

    default:
      return state;
  }
};
