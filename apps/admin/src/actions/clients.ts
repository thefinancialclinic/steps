import api from 'api';
import { Client } from 'reducers/clients';

type DispatchFn = (dispatch?: any, getState?: any) => any;

const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = (): DispatchFn => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const allClients = await api.get('/clients');
    const clients = [...allClients.data].filter(c => c.coach_id === user.id);

    return dispatch(setClients(clients));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SET_CLIENTS = 'SET_CLIENTS';
export const setClients = clients => {
  return {
    type: SET_CLIENTS,
    clients,
  };
};

const tempGetCoach = async () => {
  const coaches = await api.get('/coaches');
  return coaches.data[0];
};

export const ADD_CLIENT = 'ADD_CLIENT';
export const addClient = client => {
  return {
    type: ADD_CLIENT,
    client,
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
    clientData.goals = [];

    const client = await api.post('/clients', clientData);

    return dispatch(addClient(client.data));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SET_CLIENT_GOALS = 'SET_CLIENT_GOALS';
export const setClientGoals = async (client: Client, goals: string[]) => {
  const updatedClient = {
    ...client,
    goals,
  };
  try {
    await api.put(`/clients/${client.id}`, updatedClient);
    return {
      type: SET_CLIENT_GOALS,
      clientId: client.id,
      goals,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getClientMessages = (
  clientId: number,
): DispatchFn => async dispatch => {
  try {
    const messages = await api.get(`/clients/${clientId}/messages`);
    return dispatch(setClientMessages(clientId, messages.data));
  } catch (error) {
    Promise.reject(error);
  }
};

export const SET_CLIENT_MESSAGES = 'SET_CLIENT_MESSAGES';
export const setClientMessages = (clientId, messages) => {
  return {
    type: SET_CLIENT_MESSAGES,
    clientId: clientId,
    messages: messages,
  };
};

export const getClientRequests = (
  clientId: number,
): DispatchFn => async dispatch => {
  try {
    const requests = await api.get(`/clients/${clientId}/requests`);
    return dispatch(setClientRequests(clientId, requests.data));
  } catch (error) {
    Promise.reject(error);
  }
};

export const SET_CLIENT_REQUESTS = 'SET_CLIENT_REQUESTS';
export const setClientRequests = (clientId, requests) => {
  return {
    type: SET_CLIENT_REQUESTS,
    clientId: clientId,
    requests: requests,
  };
};

export const getClientMessagesAndRequests = (
  clientId: number,
): DispatchFn => async dispatch => {
  dispatch(getClientMessages(clientId));
  dispatch(getClientRequests(clientId));
};
