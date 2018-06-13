import { shallow } from 'enzyme';
import React from 'react';
import { GoalListLayout, ViewGoalList } from './ViewGoalList';

describe('ViewGoalList.tsx', () => {
  const client = {
    id: 123,
  };
  it('renders correctly', () => {
    const actions = {
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };
    const client = {
      goals: [
        {
          text: 'first goal',
        },
        {
          text: 'second goal',
        },
      ],
    };

    const wrapper = shallow(<ViewGoalList client={client} actions={actions} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('loads clients on mount', done => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const wrapper = shallow(<ViewGoalList actions={actions} />);

    process.nextTick(() => {
      expect(actions.getClients).toHaveBeenCalled();
      done();
    });
  });

  it('displays a list of goals if there are goals', () => {
    const actions = {
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const client = {
      goals: [
        {
          text: 'first goal',
        },
        {
          text: 'second goal',
        },
      ],
    };

    const wrapper = shallow(<ViewGoalList client={client} actions={actions} />);
    const goalList = wrapper.find(GoalListLayout);

    expect(goalList).toHaveLength(1);
  });

  it('displays an error message if load clients fails', done => {
    const actions = {
      getClients: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(<ViewGoalList actions={actions} />);

    process.nextTick(() => {
      expect(actions.addAlert).toHaveBeenCalledWith({
        level: 'error',
        message: 'some error',
        id: 'view-goal-get-clients-error',
      });
      done();
    });
  });
});
