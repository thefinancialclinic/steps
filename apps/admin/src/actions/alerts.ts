export const ADD_ALERT = 'ADD_ALERT';
export const addAlert = (message, level, id) => {
  return {
    type: ADD_ALERT,
    message,
    level,
    id
  };
};

export const REMOVE_ALERT = 'REMOVE_ALERT';
export const removeAlert = id => {
  return {
    type: REMOVE_ALERT,
    id
  };
};
