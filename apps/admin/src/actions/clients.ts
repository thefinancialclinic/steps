import client from 'client';

type DispatchFn = (dispatch?: any, getState?: any) => any;

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = (): DispatchFn => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const allClients = await axios.get(apiUrl + '/clients');
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
  const coaches = await client.get('/coaches');
  return coaches.data[0];
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

    const clients = await client.post('/clients', clientData);
    return dispatch(getClients());
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
    await client.put(`/clients/${client.id}`, updatedClient);
    return {
      type: SET_CLIENT_GOALS,
      clientId: client.id,
      goals,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
