import {
  SET_CLIENTS,
  SET_CLIENT_GOALS,
  SET_CLIENT_MESSAGES,
} from 'actions/clients';

export type UserPlatform = 'SMS' | 'FBOOK';
export type UserStatus = 'AWAITING_HELP' | 'WORKING' | 'NON_RESPONSIVE';

export type Client = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  coach_id: number;
  org_id: number;
  color: string;
  goals: string[];
  status: UserStatus;
  updated: string;
  platform: UserPlatform;
  image: string;
  follow_up_date: string;
  checkin_times: CheckinTime[];
  topic: string;
};

export type CheckinTime = {
  topic: string;
  message: string;
  time: string;
};

export type Org = {
  id: number;
  name: string;
  sms_number: string;
  logo: string;
};

export interface ClientsState {
  clients: Client[];
}

const initialState: ClientsState = {
  clients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENTS:
      return {
        ...state,
        clients: action.clients,
      };
    case SET_CLIENT_GOALS:
      return {
        ...state,
        clients: state.clients.map(client => {
          if (client.id === action.clientId) {
            return {
              ...client,
              goals: action.goals,
            };
          }
          return client;
        }),
      };
    case SET_CLIENT_MESSAGES:
      return {
        ...state,
        clients: state.clients.map(client => {
          if (client.id === action.clientId) {
            return {
              ...client,
              messages: action.messages,
            };
          }
          return client;
        }),
      };
    default:
      return state;
  }
};
