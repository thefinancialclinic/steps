import { shallow } from 'enzyme';
import FollowUpForm from './FollowUpForm';
import React from 'react';

describe('FollowUpForm.tsx', () => {
  it('renders correctly', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FollowUpForm onSubmit={onSubmit} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('submits the form', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FollowUpForm onSubmit={onSubmit} />);

    wrapper.simulate('submit', { some: 'data' });

    expect(onSubmit).toHaveBeenCalledWith({ some: 'data' });
  });
});
