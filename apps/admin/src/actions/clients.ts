import axios from 'axios';
import { addAlert } from './alerts';
import { AlertLevel } from '../components/Alert/types';

type DispatchFn = (dispatch?: any, getState?: any) => any;

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = (): DispatchFn => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const allClients = await axios.get(apiUrl + '/clients');
    console.log(allClients.data);
    const clients = [...allClients.data].filter(c => c.coach_id === user.id);

    return dispatch(setClients(clients));
  } catch (error) {
    console.error(error);
  }
};

export const SET_CLIENTS = 'SET_CLIENTS';
export const setClients = clients => {
  return {
    type: SET_CLIENTS,
    clients,
  };
};

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const createClient = (clientData): DispatchFn => async (
  dispatch,
  getState,
) => {
  try {
    // TODO: Coach should be stored in the auth store, with current user information
    const { user } = getState().auth;
    clientData.org_id = user.org_id;
    clientData.coach_id = user.id;
    clientData.color = 'blue';
    clientData.status = 'AWAITING_HELP';

    const clients = await axios.post(apiUrl + '/clients', clientData);
    return dispatch(getClients());
  } catch (error) {
    return dispatch(addAlert('Unable to create client', AlertLevel.Error, '1'));
  }
};
