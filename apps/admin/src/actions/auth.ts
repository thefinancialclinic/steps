import api from 'api';
import auth0 from 'services/auth0';
import { User, USER_TYPE } from 'reducers/auth';
import { DispatchFn } from 'actions/types';

export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';
export const setUser = user => async dispatch => {
  const org = await api.get(`/orgs/${user.org_id}`);
  user.org = org.data;
  dispatch({ type: SET_AUTHENTICATED_USER, user });
};

export const signup = (userType, userAttrs) => async () => {
  const { email, password } = userAttrs;
  try {
    const auth0User = await auth0.signup(email, password);
    userAttrs.auth0_id = auth0User.Id;
    userAttrs.type = userType;
    delete userAttrs.password;
    if (userType === USER_TYPE.ADMIN) {
      const org = await api.post('/orgs', {
        name: userAttrs.organization_name,
        sms_number: '5551234567',
      });
      userAttrs.org_id = parseInt(org.data.id.id);
    }
    userAttrs.color = 'blue';
    userAttrs.goals = [];
    userAttrs.status = 'AWAITING_HELP';
    await api.post('/users', userAttrs);
    auth0.login(email, password);
  } catch (err) {
    const { message } = err;
    if (message) {
      throw { message: message };
    } else {
      throw { message: err.toString() };
    }
  }
};

export const LOGOUT = 'LOGOUT';
export const logout = () => dispatch => {
  auth0.logout();
  return dispatch({ type: LOGOUT, user: null });
};

export const SET_ORG = 'SET_ORG';
export const setOrg = org => {
  return {
    type: SET_ORG,
    org,
  };
};

export const getOrg = (id): DispatchFn => async dispatch => {
  try {
    const { data } = await api.get(`/orgs/${id}`);
    return dispatch(setOrg(data));
  } catch (err) {
    return Promise.reject(err);
  }
};

export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = async user => {
  // TODO: Update user via Auth0 API
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export const updateOrganization = async (org, user) => dispatch => {
  // TODO: Update company via API
  return dispatch(updateUser({ ...user, org }));
};

///////////////////////////////////////////////// User switcher

export const SET_USER_TYPE = 'SET_USER_TYPE';
export const setUserType = userType => {
  return { type: SET_USER_TYPE, userType };
};

export const AUTHENTICATE = 'AUTHENTICATE';
export const authenticate = async userType => {
  return { type: AUTHENTICATE, userType };
};

export const LOGIN = 'LOGIN';
export const login = (userType, userEmail) => async dispatch => {
  let user: User = { type: userType, email: userEmail };
  let org: any = { name: 'Steps' };

  try {
    if (userType === USER_TYPE.SUPER_ADMIN) {
      user.first_name = 'SuperAdmin';
      user.last_name = 'User';
      user.org = org;
    } else if (userType === USER_TYPE.ADMIN) {
      user.first_name = 'Admin';
      user.last_name = 'User';
      user.org = org;
    } else if (userType === USER_TYPE.COACH) {
      const coaches = await api.get('/coaches');
      user = coaches.data.find(c => c.email === userEmail) || coaches.data[0];
      org = await api.get(`/orgs/${user.org_id}`);
      user.org = org.data;
    } else if (userType === USER_TYPE.CLIENT) {
      const clients = await api.get('/clients');
      user = clients.data.find(c => c.email === userEmail) || clients.data[0];
      org = await api.get(`/orgs/${user.org_id}`);
      user.org = org.data;
    }

    dispatch({ type: LOGIN, user });
  } catch (error) {
    console.error(error);
  }
};
