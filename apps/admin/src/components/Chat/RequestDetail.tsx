import styled from 'styled-components';
import { Box } from 'grid-styled';
import React from 'react';
import Request from './Request';
import Resolved from './Resolved';
import Reply from './Reply';
import ReplyForm from 'forms/ReplyForm';
import { Request as RequestType, Message } from './types';
import moment from 'moment';

type RequestWithMessages = RequestType & { messages: Message[] };

interface Props {
  request?: RequestWithMessages;
}

interface Submittable {
  onSubmit(data): void;
}

export const RequestMessages: React.SFC<Props> = ({ request }) => {
  const { status } = request;
  const requests = request.messages.map(message => {
    if (message.from_user === request.user_id) {
      const { text, timestamp } = message;
      return (
        <Request
          key={message.id}
          status={status}
          message={text}
          date={moment(timestamp)}
        />
      );
    }
  });
  return <div>{requests}</div>;
};

export const ReplyMessages: React.SFC<Props> = ({ request }) => {
  const replies = request.messages.map(message => {
    if (message.from_user != request.user_id) {
      const { text, timestamp } = message;
      return <Reply key={message.id} message={text} />;
    }
  });
  return <div>{replies}</div>;
};

export const ReplyFormSection: React.SFC<Props & Submittable> = ({
  request,
  onSubmit,
}) => {
  const { status } = request;
  if (status === 'NEEDS_ASSISTANCE') {
    return <ReplyForm onSubmit={onSubmit} />;
  } else {
    return null;
  }
};

export const ResolvedSection: React.SFC<Props> = ({ request }) => {
  const { status } = request;
  if (status === 'RESOLVED') {
    return <Resolved />;
  } else {
    return null;
  }
};

export const RequestDetail: React.SFC<Props & Submittable> = ({
  request,
  onSubmit,
}) => {
  return (
    <Container>
      <RequestMessages request={request} />
      <ReplyMessages request={request} />
      <ReplyFormSection request={request} onSubmit={onSubmit} />
      <ResolvedSection request={request} />
    </Container>
  );
};

const Container = styled(Box)`
  div {
    margin: 0;
    margin-bottom: 3px;
  }
`;

export default RequestDetail;
