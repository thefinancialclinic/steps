import { shallow } from 'enzyme';
import 'jest';
import React from 'react';
import GoalForm from '../../forms/GoalForm';
import { NewGoal } from './NewGoal';

describe('NewGoal.tsx', () => {
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
      <NewGoal client={client} actions={actions} history={history} />,
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
      <NewGoal client={client} actions={actions} history={history} />,
    );

    const goalForm = wrapper.find(GoalForm);

    goalForm.simulate('submit', { goal: 'It is my goal to go to the moon' });

    expect(actions.setClientGoals).toHaveBeenCalledWith(123, [
      'It is my goal to get a job',
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
      <NewGoal client={client} actions={actions} history={history} />,
    );

    const goalForm = wrapper.find(GoalForm);

    goalForm.simulate('submit', {
      goal: 'It is my goal to go to the moon',
    });

    process.nextTick(() => {
      expect(actions.addAlert).toHaveBeenCalled();
      done();
    });
  });

  it('redirects back to the goals page on success', async () => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
      setClientGoals: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const wrapper = shallow(
      <NewGoal client={client} actions={actions} history={history} />,
    );

    const goalForm = wrapper.find(GoalForm);

    await goalForm.simulate('submit', {
      goal: 'It is my goal to go to the moon',
    });

    expect(history.push).toHaveBeenCalledWith('/clients/123/goals');
  });
});
