import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import { Goals } from './GoalList';
import Goal from 'components/Goals/Goal';

describe('ToalsList.tsx', () => {
  const goals: string[] = ['first goal', 'second goal'];
  const history = {
    push: jest.fn(),
  };

  it('displays goals', () => {
    const wrapper = shallow(<Goals history={history} goals={goals} />);

    expect(wrapper).toMatchSnapshot();
    const goalsList = wrapper.dive().find(Goal);

    expect(goalsList).toHaveLength(2);
  });

  it('routes to /goals/edit', () => {
    const wrapper = shallow(<Goals history={history} goals={goals} />);
    const goalsList = wrapper.dive().find(Goal);

    goalsList.first().simulate('edit');

    expect(history.push).toHaveBeenCalledWith('/goals/edit');
  });
});
