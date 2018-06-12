import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import GoalList from './GoalList';
import GoalComponent from './Goal';

describe('GoalList.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GoalList goals={[]} />);

    expect(wrapper).toBeDefined();
  });

  it('renders a list of a goals', () => {
    const goals = [
      {
        text: 'Goal 1',
      },
      {
        text: 'Goal 2',
      },
      {
        text: 'Goal 3',
      },
    ];
    const wrapper = shallow(<GoalList goals={goals} />);
    const goalList = wrapper.dive().find(GoalComponent);

    expect(goalList).toHaveLength(3);
  });
});
