import styled from 'styled-components';
import { Box } from 'grid-styled';
import React from 'react';
import Request from './Request';
import Resolved from './Resolved';
import Reply from './Reply';
import ReplyForm from 'forms/ReplyForm';

interface Props {
  request?: any;
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

export const RequestDetail: React.SFC<Props> = ({ request }) => {
  const { status, message, date } = request;
  return (
    <Container>
      <Request status={status} message={message} date={date} />
      <ReplySection request={request} />
      {status === 'RESOLVED' ? <Resolved /> : null}
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
