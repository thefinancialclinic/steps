import styled from 'styled-components';
import { Box } from 'grid-styled';
import React from 'react';
import Request from './Request';
import Resolved from './Resolved';
import Reply from './Reply';
import ReplyForm from 'forms/ReplyForm';
import { Request as RequestType, Message } from './types';
import moment from 'moment';

interface Props {
  request?: RequestType;
  message?: Message;
}

export const ReplySection: React.SFC<Props> = ({ request }) => {
  const { status } = request;
  if (status === 'NEEDS_ASSISTANCE') {
    return <ReplyForm onSubmit={() => {}} />;
  } else {
    return <Reply message="Rafa, you should do x and y" />;
  }
};

export const ResolvedSection: React.SFC<Props> = ({ request }) => {
  const { status } = request;
  if (status === 'RESOLVED') {
    return <Resolved />;
  }
};

export const RequestDetail: React.SFC<Props> = props => {
  const { request, message } = props;
  const { text, timestamp } = message;
  const { status } = request;
  return (
    <Container>
      <Request status={status} message={text} date={moment(timestamp)} />
      <ReplySection {...props} />
      <ResolvedSection {...props} />
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
