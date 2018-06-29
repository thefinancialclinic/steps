import { shallow } from 'enzyme';
import RequestDetail, {
  RequestMessages,
  ReplyMessages,
  ReplyFormSection,
  ResolvedSection,
} from './RequestDetail';
import * as React from 'react';
import 'jest';
import { RequestStatus } from './types';
import Request from './Request';
import ReplyForm from '../../forms/ReplyForm';
import Reply from './Reply';
import Resolved from './Resolved';

const needsAssistance: RequestStatus = 'NEEDS_ASSISTANCE';
const replied: RequestStatus = 'REPLIED';
const resolved: RequestStatus = 'RESOLVED';
let request;

const fakeSubmit = jest.fn();

const requestMessage = {
  id: 1,
  text: 'Help me!',
  to_user: 1,
  from_user: 2,
  request_id: 1,
  timestamp: '2018-01-01',
};

const replyMessage = {
  id: 1,
  text: 'Help me!',
  to_user: 2,
  from_user: 1,
  request_id: 1,
  timestamp: '2018-01-01',
};

describe('RequestDetail', () => {
  describe('needs assistance', () => {
    beforeEach(() => {
      request = {
        id: 1,
        status: needsAssistance,
        user_id: 2,
        task_id: 1,
        messages: [requestMessage],
      };
    });

    it('shows message', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(RequestMessages)
          .shallow()
          .find(Request),
      ).toHaveLength(1);
    });

    it('shows reply form', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(ReplyFormSection)
          .shallow()
          .find(ReplyForm),
      ).toHaveLength(1);
    });
  });

  describe('replied', () => {
    beforeEach(() => {
      request = {
        id: 1,
        status: replied,
        user_id: 2,
        task_id: 1,
        messages: [requestMessage, replyMessage],
      };
    });

    it('shows message', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(RequestMessages)
          .shallow()
          .find(Request),
      ).toHaveLength(1);
    });

    it('shows reply', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(ReplyMessages)
          .shallow()
          .find(Reply),
      ).toHaveLength(1);
    });

    it('shows reply form', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(ReplyFormSection)
          .shallow()
          .find(ReplyForm),
      ).toHaveLength(1);
    });
  });

  describe('resolved', () => {
    beforeEach(() => {
      request = {
        id: 1,
        status: resolved,
        user_id: 2,
        task_id: 1,
        messages: [requestMessage, replyMessage],
      };
    });

    it('shows message', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(RequestMessages)
          .shallow()
          .find(Request),
      ).toHaveLength(1);
    });

    it('shows reply', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(ReplyMessages)
          .shallow()
          .find(Reply),
      ).toHaveLength(1);
    });

    it('shows resolved', () => {
      const wrapper = shallow(
        <RequestDetail request={request} onSubmit={fakeSubmit} />,
      );
      expect(
        wrapper
          .find(ResolvedSection)
          .shallow()
          .find(Resolved),
      ).toHaveLength(1);
    });
  });
});
