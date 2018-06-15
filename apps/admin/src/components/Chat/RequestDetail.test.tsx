import { shallow } from 'enzyme';
import RequestDetail, { ReplySection, ResolvedSection } from './RequestDetail';
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

const message = {
  id: 1,
  text: 'Help me!',
  to_user: 1,
  from_user: 2,
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
      };
    });

    it('shows message', () => {
      const wrapper = shallow(
        <RequestDetail request={request} message={message} />,
      );
      expect(wrapper.find(Request)).toHaveLength(1);
    });

    it('shows reply form', () => {
      const wrapper = shallow(
        <RequestDetail request={request} message={message} />,
      );
      expect(
        wrapper
          .find(ReplySection)
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
      };
    });

    it('shows message', () => {
      const wrapper = shallow(
        <RequestDetail request={request} message={message} />,
      );
      expect(wrapper.find(Request)).toHaveLength(1);
    });

    it('shows reply', () => {
      const wrapper = shallow(
        <RequestDetail request={request} message={message} />,
      );
      expect(
        wrapper
          .find(ReplySection)
          .shallow()
          .find(Reply),
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
      };
    });

    it('shows message', () => {
      const wrapper = shallow(
        <RequestDetail request={request} message={message} />,
      );
      expect(wrapper.find(Request)).toHaveLength(1);
    });

    it('shows reply', () => {
      const wrapper = shallow(
        <RequestDetail request={request} message={message} />,
      );
      expect(
        wrapper
          .find(ReplySection)
          .shallow()
          .find(Reply),
      ).toHaveLength(1);
    });

    it('shows resolved', () => {
      const wrapper = shallow(
        <RequestDetail request={request} message={message} />,
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
