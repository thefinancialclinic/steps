import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import GoalList from './GoalList';

describe('GoalList.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GoalList />);

    expect(wrapper).toBeDefined();
  });
});
