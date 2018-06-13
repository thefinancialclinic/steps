import axios from 'axios';

type DispatchFn = (any) => any;

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = (): DispatchFn => async dispatch => {
  try {
    const clients = await axios.get(apiUrl + '/clients');
    return dispatch(setClients(clients.data));
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
  const coaches = await axios.get(apiUrl + '/coaches');
  return coaches.data[0];
};

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const createClient = (clientData): DispatchFn => async dispatch => {
  try {
    // TODO: Coach should be stored in the auth store, with current user information
    const coach = await tempGetCoach();
    clientData.org_id = coach.org_id;
    clientData.coach_id = coach.id;
    clientData.color = 'blue';
    clientData.status = 'AWAITING_HELP';

    const clients = await axios.post(apiUrl + '/clients', clientData);
    return dispatch(getClients());
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SET_CLIENT_GOALS = 'SET_CLIENT_GOALS';
export const setGoals = (clientId, goals) => {
  // api call
  return {
    type: SET_CLIENT_GOALS,
    clientId,
    goals,
  };
};
