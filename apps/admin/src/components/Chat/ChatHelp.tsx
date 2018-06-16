import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import NoChat from './NoChat';
import Requests from './Requests';

interface Props {
  className?: string;
  client: any;
}

class ChatList extends React.Component<Props, {}> {
  render() {
    const { client } = this.props;
    const { messages, requests } = this.props.client;

    return requests && requests.length > 0 ? (
      <Requests client={client} />
    ) : (
      <Box width={1}>
        <NoChat type="help" />
      </Box>
    );
  }
}

const StyledChatList = styled(ChatList)`
  display: flex;
`;

export default StyledChatList;
