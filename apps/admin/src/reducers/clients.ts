import { SET_CLIENTS } from 'actions/clients';

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
  orgs: Org[];
}

const initialState: ClientsState = {
  clients: [
    {
      id: 0,
      first_name: 'string',
      last_name: 'string',
      email: 'user@example.com',
      phone: 'string',
      coach_id: 0,
      org_id: 0,
      color: 'string',
      goals: ['string'],
      status: 'AWAITING_HELP',
      updated: '2018-06-04T14:44:20.085Z',
      platform: 'SMS',
      image: 'string',
      follow_up_date: '2018-06-04T14:44:20.085Z',
      checkin_times: [
        {
          topic: 'string',
          message: 'string',
          time: '2018-06-04T14:44:20.085Z',
        },
      ],
      topic: 'string',
    },
  ],
  orgs: [
    {
      id: 0,
      name: 'string',
      sms_number: 'string',
      logo: 'string',
    },
  ],
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
