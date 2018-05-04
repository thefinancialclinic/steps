import { SET_CLIENTS } from 'actions/clients';

const initialState = {
  clients: [],
};

export default (state = initialState, action) => {

  if (action.type === SET_CLIENTS) {
    return {
      ...state,
      clients: action.clients,
    };
  }

  return state;
};
