import 'jest';
import { setGoals } from '../actions/clients';
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

describe('clients reducer', () => {
  it('updates goals ', () => {
    const action = setGoals(0, ['new goal']);

    const updatedState = reducer(initialState, action);
    expect(updatedState.clients[0].goals).toEqual(['new goal']);
  });
});
