export const addAlert = (message, level, id) => {
  return {
    type: 'ADD_ALERT',
    message,
    level,
    id
  };
};

export const removeAlert = id => {
  return {
    type: 'REMOVE_ALERT',
    id
  };
};
