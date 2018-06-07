import React from 'react';
import styled from 'styled-components';
import Panel from 'atoms/Panel';
import { Flex } from 'grid-styled';
import { red, blue, green, grey } from 'styles/colors';

interface Props {
  className?: string;
  status: RequestStatus;
  message: string;
  date: Date;
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

export class Request extends React.Component<Props, {}> {
  render() {
    const { className, status, message, date } = this.props;
    return (
      <div className={className} {...this.props}>
        <Panel className="container">
          <Flex>
            <div className="status">{statusText(status)}</div>
            <div className="date">{date.toLocaleDateString()}</div>
          </Flex>
          <div className="message">{message}</div>
        </Panel>
      </div>
    );
  }
}

const StyledRequest = styled(Request)`
  border-left: 10px solid ${props => statusColor(props.status)};
  font-family: 'Calibre', sans-serif;
  margin: 20px;

  .container {
      padding: 30px;
  }

  .date {
      color ${grey};
      margin-left: auto;
  }

  .status {
    font-size: 16px;
    color: ${props => statusColor(props.status)};
    text-transform: uppercase;
  }

  .message {
      font-size: 30px;
  }
`;

export default StyledRequest;
