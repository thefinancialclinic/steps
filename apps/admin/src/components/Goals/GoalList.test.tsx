import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { GoalList } from './GoalList';

describe('GoalList.tsx', () => {
  it('renders correctly', () => {
    const goals = ['goal 1', 'goal 2', 'goal 3'];
    const wrapper = shallow(
      <GoalList goals={goals} client={{ id: 123 }} history={jest.fn()} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
