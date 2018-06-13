import { shallow } from 'enzyme';
import React from 'react';
import { AlertLevel } from '../../components/Alert/types';
import GoalForm from '../../forms/GoalForm';
import { NewGoal } from './NewGoal';
import 'jest';

describe('NewGoal.tsx', () => {
  const client = {
    id: 123,
  };

  it('has a goal form', () => {
    const actions = {
      addAlert: jest.fn(),
      getClients: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const wrapper = shallow(<NewGoal client={client} actions={actions} />);

    const goalForm = wrapper.find(GoalForm);

    expect(goalForm).toHaveLength(1);
  });
});
