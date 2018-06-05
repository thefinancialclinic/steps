import axios from 'axios';
import { addAlert } from './alerts';
import { AlertLevel } from '../components/Alert/types';

type DispatchFn = (any) => any;

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = (): DispatchFn => async dispatch => {
  try {
    const clients = await axios.get(apiUrl + '/clients');
    return dispatch(setClients(clients.data));
  } catch (error) {
    console.error(error);
  }
};

export const SET_CLIENTS = 'SET_CLIENTS';
export const setClients = clients => {
  return {
    type: SET_CLIENTS,
    clients
  };
};

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const createClient = (clientData): DispatchFn => async dispatch => {
  try {
    clientData.org_id = 1;
    clientData.coach_id = 6;
    clientData.color = 'blue';
    clientData.status = 'AWAITING_HELP';

    const clients = await axios.post(apiUrl + '/clients', clientData);
    return dispatch(getClients());
  } catch (error) {
    return dispatch(addAlert('Unable to create client', AlertLevel.Error, '1'));
  }
};
