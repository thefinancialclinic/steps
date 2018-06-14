import client from 'client';

type DispatchFn = (any) => any;

export const getClients = (): DispatchFn => async dispatch => {
  try {
    const clients = await client.get('/clients');
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
  const coaches = await client.get('/coaches');
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
    clientData.goals = [];

    const clients = await client.post('/clients', clientData);
    return dispatch(getClients());
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SET_CLIENT_GOALS = 'SET_CLIENT_GOALS';
export const setClientGoals = async (clientId, goals) => {
  // TODO: API call to PUT /clients
  return {
    type: SET_CLIENT_GOALS,
    clientId,
    goals,
  };
};
