import 'jest';
import { shallow } from 'enzyme';
import GoalForm from './GoalForm';
import React from 'react';
import Textarea from '../components/Form/Textarea';

describe('NewGoalForm.tsx', () => {
  it('renders correctly', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<GoalForm onSubmit={onSubmit} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('submits the form', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<GoalForm onSubmit={onSubmit} />);

    wrapper.simulate('submit', { some: 'data' });

    expect(onSubmit).toHaveBeenCalledWith({ some: 'data' });
  });

  it('displays Add New Goal if no goal exists', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<GoalForm onSubmit={onSubmit} />);

    const header = wrapper.dive().find('h2');

    expect(header.text()).toEqual('Add New Goal');
  });

  it('displays Edit Goal if goal exists', () => {
    const onSubmit = jest.fn();
    const goal = { text: 'My goal' };

    const wrapper = shallow(<GoalForm onSubmit={onSubmit} goal={goal} />);

    const header = wrapper.dive().find('h2');

    expect(header.text()).toEqual('Edit Goal');
  });

  it('displays goal text if goal exists', () => {
    const onSubmit = jest.fn();
    const goal = { text: 'My goal' };

    const wrapper = shallow(<GoalForm onSubmit={onSubmit} goal={goal} />);

    const textarea = wrapper.dive().find(Textarea);

    expect(textarea.props().value).toEqual('My goal');
  });
});
