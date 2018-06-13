import { Alert } from 'components/Alert/types';

export const ADD_ALERT = 'ADD_ALERT';
export const addAlert = (alert: Alert) => {
  return {
    type: ADD_ALERT,
    alert,
  };
};

export const REMOVE_ALERT = 'REMOVE_ALERT';
export const removeAlert = id => {
  return {
    type: REMOVE_ALERT,
    id,
  };
};
