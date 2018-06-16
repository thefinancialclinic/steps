import React from 'react';
import { Box } from 'grid-styled';
import { Link } from 'react-router-dom';
import Request from './Request';
import moment from 'moment';
import styled from 'styled-components';
import { black } from 'styles/colors';

interface Props {
  className?: string;
  client: any;
}

export const joinRequestsAndMessages = (requests, messages) => {
  requests = requests || [];
  messages = messages || [];
  return requests.map(request => {
    const message = messages.find(message => message.request_id === request.id);
    return {
      request: request,
      message: message,
    };
  });
};

class Requests extends React.Component<Props, {}> {
  render() {
    const { client } = this.props;
    const { requests, messages } = client;
    const joined = joinRequestsAndMessages(requests, messages);
    return (
      <Container>
        {joined.map(({ request, message }) => {
          if (request && message) {
            return (
              <Link
                key={request.id}
                to={`/clients/${client.id}/chat/help/requests/${request.id}`}
              >
                <Request
                  status={request.status}
                  message={message.text}
                  date={moment(message.timestamp)}
                />
              </Link>
            );
          }
        })}
      </Container>
    );
  }
}

const Container = styled(Box)`
  a {
    text-decoration: none;
  }
  a:visited {
    color: ${black};
  }
`;

export default Requests;
