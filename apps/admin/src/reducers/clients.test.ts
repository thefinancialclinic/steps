import 'jest';
import { SET_CLIENT_GOALS, SET_CLIENT_MESSAGES } from './../actions/clients';
import reducer, { ClientsState } from './clients';

const initialState: ClientsState = {
  clients: [
    {
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
    },
  ]
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
    expect(updatedState.clients[0].messages).toEqual(messages);
  });
});
