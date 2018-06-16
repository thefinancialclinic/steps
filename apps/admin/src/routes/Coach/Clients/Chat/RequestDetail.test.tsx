import 'jest';
import { addMessagesToRequest } from './RequestDetail';

const request = { id: 1 };

const messages = [
  { id: 1, request_id: 1 },
  { id: 2, request_id: 1 },
  { id: 3, request_id: 2 },
];

it('combines messages with requests', () => {
  const withMessages = addMessagesToRequest(request, messages);
  expect(withMessages.messages).toHaveLength(2);
});

it('handles requests with no messages', () => {
  const withMessages = addMessagesToRequest({ id: 3 }, messages);
  expect(withMessages.messages).toHaveLength(0);
});
