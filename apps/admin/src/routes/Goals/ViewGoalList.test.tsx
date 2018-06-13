import { shallow } from 'enzyme';
import React from 'react';
import { GoalListLayout, ViewGoalList } from './ViewGoalList';

describe('ViewGoalList.tsx', () => {
  it('renders correctly', () => {
    const actions = {
      getGoals: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };
    const goals = [
      {
        text: 'first goal',
      },
      {
        text: 'second goal',
      },
    ];

    const wrapper = shallow(<ViewGoalList goals={goals} actions={actions} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('loads goals on mount', () => {
    const actions = {
      getGoals: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(<ViewGoalList goals={[]} actions={actions} />);

    expect(actions.getGoals).toHaveBeenCalled();
  });

  it('displays a list of goals if there are goals', () => {
    const actions = {
      getGoals: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const goals = [{ text: 'first goal' }, { text: 'second goal' }];
    const wrapper = shallow(<ViewGoalList goals={goals} actions={actions} />);
    const goalList = wrapper.find(GoalListLayout);

    expect(goalList).toHaveLength(1);
  });

  it('displays an error message if load goals fails', done => {
    const actions = {
      getGoals: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(<ViewGoalList goals={[]} actions={actions} />);

    process.nextTick(() => {
      expect(actions.addAlert).toHaveBeenCalledWith({
        level: 'error',
        message: 'some error',
        id: 'view-goal-error',
      });
      done();
    });
  });
});
