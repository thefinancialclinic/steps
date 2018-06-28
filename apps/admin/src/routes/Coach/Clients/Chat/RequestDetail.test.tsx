import 'jest';
import { RequestDetailRoute, addMessagesToRequest } from './RequestDetail';
import { shallow } from 'enzyme';
import RequestDetail from '../../../../components/Chat/RequestDetail';
import React from 'react';

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

it('handles the form submission', () => {
  const actions = {
    createReply: jest.fn().mockReturnValue(Promise.resolve()),
    addAlert: jest.fn(),
  };
  const match = {
    params: {
      requestId: 1,
    },
  };
  const user = {
    requests: [request],
    messages: messages,
  };
  const wrapper = shallow(
    <RequestDetailRoute
      user={user}
      messages={messages}
      requests={[request]}
      match={match}
      actions={actions}
    />,
  );
  const form = wrapper.find(RequestDetail);

  form.simulate('submit', { reply: 'some reply' });

  expect(actions.createReply).toHaveBeenCalled();
});

it('displays an error if the form submission returns an error', () => {
  const actions = {
    createReply: jest
      .fn()
      .mockReturnValue(Promise.reject({ message: 'some error' })),
    addAlert: jest.fn(),
  };
  const match = {
    params: {
      requestId: 1,
    },
  };
  const user = {
    requests: [request],
    messages: messages,
  };
  const wrapper = shallow(
    <RequestDetailRoute
      user={user}
      messages={messages}
      requests={[request]}
      match={match}
      actions={actions}
    />,
  );
  const form = wrapper.find(RequestDetail);

  form.simulate('submit', { reply: 'some reply ' });

  setTimeout(() => {
    expect(actions.addAlert).toHaveBeenCalled();
  }, 0);
});
