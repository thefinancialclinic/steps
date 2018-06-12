export const SET_USER_TYPE = 'SET_USER_TYPE';
export const setUserType = userType => {
  return { type: SET_USER_TYPE, userType };
};

export const AUTHENTICATE = 'AUTHENTICATE';
export const authenticate = async userType => {
  return { type: AUTHENTICATE, userType };
};

export const LOGIN = 'LOGIN';
export const login = async userType => dispatch => {
  return dispatch({ type: SET_USER_TYPE, userType });
};

export const LOGOUT = 'LOGOUT';
export const logout = async userType => dispatch => {
  return dispatch({ type: SET_USER_TYPE, userType: null });
};
