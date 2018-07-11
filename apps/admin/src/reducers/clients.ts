import { UPDATE_CLIENT } from './../actions/clients';
import {
  ADD_CLIENT,
  SET_CLIENTS,
  SET_CLIENT_FOLLOW_UP_DATE,
  SET_CLIENT_GOALS,
  SET_CLIENT_MESSAGES,
  SET_CLIENT_REQUESTS,
} from 'actions/clients';

export enum USER_PLATFORM {
  SMS = 'SMS',
  FACEBOOK = 'FBOOK',
}

export type UserPlatform = USER_PLATFORM.SMS | USER_PLATFORM.FACEBOOK;
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
  clientMessages: any;
  clientRequests: any;
}

const initialState: ClientsState = {
  clients: [],
  clientMessages: {},
  clientRequests: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENTS: {
      return {
        ...state,
        clients: action.clients,
      };
    }
    case ADD_CLIENT: {
      return {
        ...state,
        clients: [...state.clients, action.client],
      };
    }
    case SET_CLIENT_GOALS: {
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
    }
    case SET_CLIENT_MESSAGES: {
      return {
        ...state,
        clientMessages: Object.assign(state.clientMessages, {
          [action.clientId]: action.messages,
        }),
      };
    }
    case SET_CLIENT_REQUESTS: {
      return {
        ...state,
        clientRequests: Object.assign(state.clientRequests, {
          [action.clientId]: action.requests,
        }),
      };
    }
    case SET_CLIENT_FOLLOW_UP_DATE: {
      return {
        ...state,
        clients: state.clients.map(client => {
          if (client.id === action.clientId) {
            return {
              ...client,
              follow_up_date: action.followUpDate,
            };
          }
          return client;
        }),
      };
    }
    case UPDATE_CLIENT: {
      return {
        ...state,
        clients: state.clients.map(client => {
          if (client.id === action.client.id) {
            return action.client;
          }
          return client;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
