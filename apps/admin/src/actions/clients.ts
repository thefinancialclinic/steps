import axios from 'axios';

type DispatchFn = (any) => any;

const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = (): DispatchFn => async dispatch => {
  const clients = await axios.get('http://localhost:3001/users');
  return dispatch(setClients(clients.data));
};

export const SET_CLIENTS = 'SET_CLIENTS';
export const setClients = clients => {
  return {
    type: SET_CLIENTS,
    clients
  };
};
