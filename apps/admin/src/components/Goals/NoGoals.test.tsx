import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import NoGoals from './NoGoals';

describe('NoGoals.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NoGoals />);

    expect(wrapper).toBeDefined();
  });
});
