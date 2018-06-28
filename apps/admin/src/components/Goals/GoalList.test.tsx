import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { GoalList } from './GoalList';
import Goal from './goal';

describe('GoalList.tsx', () => {
  it('displays a list of goals', () => {
    const goals = ['goal 1', 'goal 2', 'goal 3'];
    const wrapper = shallow(
      <GoalList goals={goals}>
        {props => <Goal {...props} onEdit={jest.fn()} />}
      </GoalList>,
    );
    const goalList = wrapper.find(Goal);

    expect(wrapper).toMatchSnapshot();
    expect(goalList).toHaveLength(3);
  });
});
