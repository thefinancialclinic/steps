import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { AlertsList } from './AlertsList';
import { AlertLevel } from './types';

describe('AlertsList', () => {
  const actions = {
    removeAlert: jest.fn(),
  };
  it('renders correctly', () => {
    const wrapper = shallow(<AlertsList actions={actions} alerts={[]} />);

    expect(wrapper).toBeDefined();
  });
});
