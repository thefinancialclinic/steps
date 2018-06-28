import 'jest';
import {
  SET_CLIENT_GOALS,
  SET_CLIENT_MESSAGES,
  SET_CLIENT_REQUESTS,
  UPDATE_CLIENT,
} from './../actions/clients';
import reducer, { ClientsState, Client } from './clients';

const client: Client = {
  id: 0,
  first_name: 'Jane',
  last_name: 'Smith',
  email: 'user@example.com',
  phone: 'string',
  coach_id: 0,
  org_id: 0,
  color: 'string',
  goals: [],
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
};

const initialState: ClientsState = {
  clients: [client],
  clientMessages: {},
  clientRequests: {},
};

describe('clients reducer', () => {
  it('updates goals ', () => {
    const mockAction = {
      type: SET_CLIENT_GOALS,
      clientId: 0,
      goals: ['new goal'],
    };

    const updatedState = reducer(initialState, mockAction);
    expect(updatedState.clients[0].goals).toEqual(['new goal']);
  });

  it('sets messages by client', () => {
    const messages = [{ id: 1 }, { id: 2 }];
    const mockAction = {
      type: SET_CLIENT_MESSAGES,
      clientId: 0,
      messages: [{ id: 1 }, { id: 2 }],
    };

    const updatedState = reducer(initialState, mockAction);
    expect(updatedState.clientMessages[0]).toEqual(messages);
  });

  it('sets requests by client', () => {
    const requests = [{ id: 1 }, { id: 2 }];
    const mockAction = {
      type: SET_CLIENT_REQUESTS,
      clientId: 0,
      requests: [{ id: 1 }, { id: 2 }],
    };

    const updatedState = reducer(initialState, mockAction);
    expect(updatedState.clientRequests[0]).toEqual(requests);
  });

  it('updates a client', () => {
    const mockAction = {
      type: UPDATE_CLIENT,
      client: {
        ...client,
        email: 'new-email@example.com',
      },
    };

    const updatedState = reducer(initialState, mockAction);

    expect(updatedState.clients).toHaveLength(1);
    expect(updatedState.clients[0].email).toEqual('new-email@example.com');
  });
});
