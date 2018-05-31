import { shallow } from 'enzyme';
import ChatMessage, { ChatMessageType, Message, From } from '../ChatMessage';
import * as React from 'react';

describe('ChatMessage.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ChatMessage text="test message" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders message first if type is sent', () => {
    const wrapper = shallow(
      <ChatMessage type={ChatMessageType.sent} text="sent message" />
    );
    const message = wrapper.find(Message);
    const from = wrapper.find(From);

    expect(wrapper.childAt(0)).toEqual(message);
    expect(wrapper.childAt(1)).toEqual(from);
  });

  it('renders from first if type is received', () => {
    const wrapper = shallow(
      <ChatMessage type={ChatMessageType.received} text="sent message" />
    );
    const message = wrapper.find(Message);
    const from = wrapper.find(From);

    expect(wrapper.childAt(0)).toEqual(from);
    expect(wrapper.childAt(1)).toEqual(message);
  });
});
