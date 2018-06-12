import DateDisplay from 'atoms/DateDisplay';
import Panel from 'atoms/Panel';
import Status from 'atoms/Status';
import { Flex } from 'grid-styled';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { blue, green, red } from 'styles/colors';
import { RequestStatus } from './types';

interface Props {
  className?: string;
  status: RequestStatus;
  message: string;
  date: moment.Moment;
}

const statusDetails = {
  NEEDS_ASSISTANCE: {
    text: 'Needs assistance',
    color: red,
  },
  REPLIED: {
    text: 'Replied',
    color: blue,
  },
  RESOLVED: {
    text: 'Resolved',
    color: green,
  },
};

const statusText = status => statusDetails[status].text;
const statusColor = status => statusDetails[status].color;

export const Request: React.SFC<Props> = ({
  className,
  status,
  message,
  date,
}) => (
  <StyledRequest className={className} status={status}>
    <Panel className="container">
      <Flex alignItems="center" justifyContent="space-between">
        <Status color={statusColor(status)}>{statusText(status)}</Status>
        <DateDisplay date={date} />
      </Flex>
      <Message>{message}</Message>
    </Panel>
  </StyledRequest>
);

export const Message = styled.div`
  font-size: 30px;
`;

const StyledRequest = styled<{ status: string }, 'div'>('div')`
  border-left: 10px solid ${({ status }) => statusColor(status)};
  font-family: 'Calibre', sans-serif;
  margin: 20px;

  .container {
    padding: 30px;
  }
`;

export default Request;
