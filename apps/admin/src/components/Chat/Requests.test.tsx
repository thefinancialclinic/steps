import 'jest';
import { joinRequestsAndMessages } from './Requests';
import { RequestStatus } from './types';

const needsAssistance: RequestStatus = 'NEEDS_ASSISTANCE';
const replied: RequestStatus = 'REPLIED';
const resolved: RequestStatus = 'RESOLVED';
let request;

const message = {
  id: 1,
  text: 'Help me!',
  to_user: 1,
  from_user: 2,
  request_id: 1,
  timestamp: '2018-01-01',
};

const requests = [
  {
    id: 3,
    status: resolved,
    user_id: 2,
    task_id: 3,
  },
  {
    id: 1,
    status: needsAssistance,
    user_id: 2,
    task_id: 1,
  },
  {
    id: 2,
    status: replied,
    user_id: 2,
    task_id: 2,
  },
];

const messages = [
  {
    id: 1,
    text: 'Help me with task 1!',
    to_user: 1,
    from_user: 2,
    request_id: 1,
    timestamp: '2018-01-01',
  },
  {
    id: 1,
    text: 'Help me with task 2!',
    to_user: 1,
    from_user: 2,
    request_id: 2,
    timestamp: '2018-01-01',
  },
  {
    id: 1,
    text: 'Help me with task 3!',
    to_user: 1,
    from_user: 2,
    request_id: 3,
    timestamp: '2018-01-01',
  },
];

const client = {
  id: 1,
  messages: messages,
  requests: requests,
};

describe('Requests', () => {
  it('combines requests and messages', () => {
    const joined = joinRequestsAndMessages(requests, messages);
    expect(joined[0].message.text).toBe('Help me with task 3!');
    expect(joined[0].request.status).toBe(resolved);
    expect(joined[1].message.text).toBe('Help me with task 1!');
    expect(joined[1].request.status).toBe(needsAssistance);
    expect(joined[2].message.text).toBe('Help me with task 2!');
    expect(joined[2].request.status).toBe(replied);
  });
});
