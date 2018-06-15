import { shallow } from 'enzyme';
import React from 'react';
import { red } from '../styles/colors';
import Status from './Status';

describe('Status.tsx', () => {
  it('is defined', () => {
    const wrapper = shallow(<Status color={red} />);

    expect(wrapper).toBeDefined();
  });

  it('contains text', () => {
    const wrapper = shallow(<Status color={red}>My status</Status>);

    expect(wrapper.dive().text()).toEqual('My status');
  });
});
