import { shallow } from 'enzyme';
import React from 'react';
import NoGoals from 'components/Goals/NoGoals';
import { GoalListLayout, ViewGoalList } from './ViewGoalList';
import { Goal } from 'components/Goals/types';

describe('ViewGoalList.tsx', () => {
  const client = {
    id: 123,
  };
  const history = {
    push: jest.fn(),
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

    const wrapper = shallow(
      <ViewGoalList history={history} client={client} actions={actions}>
        {childProps => <Goal {...childProps} />}
      </ViewGoalList>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('loads clients on mount', () => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
    };

    shallow(
      <ViewGoalList history={history} client={client} actions={actions}>
        {childProps => <Goal {...childProps} />}
      </ViewGoalList>,
    );

    expect(actions.getClients).toHaveBeenCalled();
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

    const wrapper = shallow(
      <ViewGoalList history={history} client={client} actions={actions}>
        {childProps => <Goal {...childProps} />}
      </ViewGoalList>,
    );
    const goalList = wrapper.find(GoalListLayout);

    expect(goalList).toHaveLength(1);
  });

  it('displays a NoGoals if there are no goals', () => {
    const actions = {
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const client = {
      goals: [],
    };

    const wrapper = shallow(
      <ViewGoalList history={history} client={client} actions={actions}>
        {childProps => <Goal {...childProps} />}
      </ViewGoalList>,
    );
    const noGoals = wrapper.find(NoGoals);

    expect(noGoals).toHaveLength(1);
  });

  it('displays an error message if load clients fails', async () => {
    const actions = {
      getClients: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <ViewGoalList history={history} client={client} actions={actions}>
        {childProps => <Goal {...childProps} />}
      </ViewGoalList>,
    );

    expect(await actions.addAlert).toHaveBeenCalledWith({
      level: 'error',
      message: 'some error',
      id: 'view-goal-get-clients-error',
    });
  });
});
