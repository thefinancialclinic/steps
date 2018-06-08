import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { AlertsList } from './AlertsList';
import { AlertLevel } from './types';

describe('AlertsList', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AlertsList alerts={[]} />);

    expect(wrapper).toBeDefined();
  });
});
