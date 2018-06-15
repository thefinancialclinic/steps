import { shallow } from 'enzyme';
import 'jest';
import React from 'react';
import GoalForm from 'forms/GoalForm';
import { EditGoal } from './EditGoal';

describe('EditGoal.tsx', () => {
  const client = {
    id: 123,
    goals: ['It is my goal to get a job'],
  };

  const history = {
    push: jest.fn(),
  };

  it('renders correctly', () => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      setClientGoals: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const wrapper = shallow(
      <EditGoal
        client={client}
        actions={actions}
        history={history}
        goal={{ id: 1, text: 'my goal' }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('sets goals for a client', () => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      setClientGoals: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const wrapper = shallow(
      <EditGoal
        client={client}
        actions={actions}
        history={history}
        goal={{ id: 0, text: 'my goal' }}
      />,
    );

    const goalForm = wrapper.find(GoalForm);

    goalForm.simulate('submit', { goal: 'It is my goal to go to the moon' });

    expect(actions.setClientGoals).toHaveBeenCalledWith(client, [
      'It is my goal to go to the moon',
    ]);
  });

  it('displays an error if set goals fails', done => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      setClientGoals: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
    };
    const wrapper = shallow(
      <EditGoal
        client={client}
        actions={actions}
        history={history}
        goal={{ id: 1, text: 'my goal' }}
      />,
    );

    const goalForm = wrapper.find(GoalForm);

    goalForm.simulate('submit', {
      goal: 'It is my goal to go to the moon',
    });

    setTimeout(() => {
      expect(actions.addAlert).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('redirects back to the goals page on success', async () => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      setClientGoals: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const wrapper = shallow(
      <EditGoal
        client={client}
        actions={actions}
        history={history}
        goal={{ id: 1, text: 'my goal' }}
      />,
    );

    const goalForm = wrapper.find(GoalForm);

    await goalForm.simulate('submit', {
      goal: 'It is my goal to go to the moon',
    });

    expect(history.push).toHaveBeenCalledWith('/clients/123/goals');
  });
});
