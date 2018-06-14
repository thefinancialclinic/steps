import React from 'react';
import { Box } from 'grid-styled';
import ChatMessage from './ChatMessage';
import { Moment } from 'moment';
import { Client } from 'reducers/clients';
import { pink } from 'styles/colors';
import styled from 'styled-components';
import DateDisplay from 'atoms/DateDisplay';
import ChatMedia from './ChatMedia';
import moment from 'moment';

export type ObjectType = {
  [key: string]: string | number | boolean | ObjectType;
};

interface Media {
  id?: number;
  title?: string;
  url?: string;
  image?: string;
}

interface Message {
  id: number;
  text: string;
  to_user: number;
  from_user: number;
  media_id?: number;
  request_id: number;
  timestamp: Moment;
  responses?: ObjectType;
}

interface Props {
  className?: string;
  messages: Message[];
  media: Media[];
  fromUser: Client;
  user: Client;
}

class ChatMessages extends React.Component<Props, {}> {
  renderMessageGroups() {
    return this.groupByDate(this.props.messages).map(
      ({ date, messages }, id) => (
        <MessageGroupContainer key={id}>
          <DateDisplay date={moment(date)} />
          {messages.map(this.renderMessage.bind(this))}
        </MessageGroupContainer>
      ),
    );
  }

  groupByDate(messages) {
    return messages.reduce((acc, curr) => {
      const date = curr.timestamp.startOf('day').format();
      const messagesByDate = acc.find(m => m.date === date);
      if (messagesByDate) {
        messagesByDate.messages.push(curr);
      } else {
        acc.push({
          date: date,
          messages: [curr],
        });
      }
      return acc;
    }, []);
  }

  getMedia(message) {
    return this.props.media.find(m => m.id === message.media_id);
  }

  getMessageType(message) {
    return message.to_user === this.props.user.id ? 'sent' : 'received';
  }

  getSenderName(message) {
    const user =
      message.to_user === this.props.user.id
        ? this.props.fromUser
        : this.props.user;
    return user.first_name;
  }

  renderChatMedia(mediaItem) {
    if (mediaItem) {
      const { title, image, url } = mediaItem;
      return (
        <ChatMediaContainer>
          <ChatMedia title={title} image={image} url={url} />
        </ChatMediaContainer>
      );
    }
  }

  renderMessage(message) {
    const mediaItem = this.getMedia(message);
    const type = this.getMessageType(message);
    const from = this.getSenderName(message);
    return (
      <ChatMessageContainer key={message.id}>
        <ChatMessage text={message.text} type={type} from={from} color={pink} />
        {this.renderChatMedia(mediaItem)}
      </ChatMessageContainer>
    );
  }

  render() {
    return <Box>{this.renderMessageGroups()}</Box>;
  }
}

const MessageGroupContainer = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const ChatMediaContainer = styled.div`
  text-align: left;
  display: flex;
  justify-content: flex-end;
  margin-right: 85px;
  margin-top: 20px;
`;

const ChatMessageContainer = styled.div`
  margin-top: 10px;
`;

export default ChatMessages;
