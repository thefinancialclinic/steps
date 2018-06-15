import api from 'api';
import { User, USER_TYPE } from 'reducers/auth';

export const SET_USER_TYPE = 'SET_USER_TYPE';
export const setUserType = userType => {
  return { type: SET_USER_TYPE, userType };
};

export const AUTHENTICATE = 'AUTHENTICATE';
export const authenticate = async userType => {
  return { type: AUTHENTICATE, userType };
};

export const LOGIN = 'LOGIN';
export const login = userType => async dispatch => {
  let user: User = { type: userType };
  let org: any = {};

  try {
    if (userType === USER_TYPE.SUPER_ADMIN) {
    } else if (userType === USER_TYPE.ADMIN) {
    } else if (userType === USER_TYPE.COACH) {
      const coaches = await api.get('/coaches');
      user = coaches.data[0];
      org = await api.get(`/orgs/${user.org_id}`);
      user.org = org.data;
    } else if (userType === USER_TYPE.CLIENT) {
      const clients = await api.get('/clients');
      user = clients.data[1];
    }

    dispatch({ type: LOGIN, user });
  } catch (error) {
    console.error(error);
  }
};

export const LOGOUT = 'LOGOUT';
export const logout = userType => dispatch => {
  return dispatch({ type: SET_USER_TYPE, userType: null });
};
