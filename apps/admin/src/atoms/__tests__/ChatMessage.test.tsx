import { shallow } from 'enzyme';
import ChatMessage from '../ChatMessage';
import * as React from 'react';

describe('ChatMessage.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ChatMessage text="test message" />);

    expect(wrapper).toMatchSnapshot();
  });
});
