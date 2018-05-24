import axios from 'axios';

type DispatchFn = (any) => any;

const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = (): DispatchFn => async dispatch => {
  try {
    // const clients = await axios.get('http://localhost:3001/clients');
    const clients = { data: [
      { id: 100, firstName: 'Fred', lastName: 'Flinstone' },
      { id: 101, firstName: 'Barney', lastName: 'Rubble' }
    ]}
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
