import React from 'react';
import styled from 'styled-components';

import Panel from './Panel';
import { white, mediumBlue } from 'styles/colors';

export enum ChatMessageType {
  sent = 'sent',
  received = 'received'
}

interface Props {
  type?: ChatMessageType;
  text: string;
  from?: string;
  color?: string;
}

class ChatMessage extends React.Component<Props, {}> {
  static props = {
    type: 'received',
    color: mediumBlue
  };

  renderChatElements() {
    const { type, text, from } = this.props;
    const chatElements = [
      <Message {...this.props} key={1}>
        {text}
      </Message>,
      <From {...this.props} key={2}>
        {from}
      </From>
    ];
    if (type === 'received') {
      return chatElements.reverse();
    }
    return chatElements;
  }
  render() {
    return <Container>{this.renderChatElements()}</Container>;
  }
}

const Container = styled.div`
  font-family: 'Tiempos', serif;
  font-size: 21px;
`;

export const Message = styled(Panel).attrs<Props>({})`
  background-color: ${({ type, color }) =>
    type === 'received' ? color : white};
  display: inline-block;
  padding: 20px;
  line-height: 25px;
`;

export const From = styled<Props, 'div'>('div')`
  display: inline-block;
  font-size: 28px;
  width: 65px;
  height: 65px;
  border-radius: 65px;
  color: ${white};
  background-color: ${({ type, color }) =>
    type === 'received' ? color : mediumBlue};
  text-align: center;
  vertical-align: middle;
  line-height: 65px;
  margin: 0 10px;
`;

export default ChatMessage;
