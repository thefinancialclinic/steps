import 'jest';
import { shallow } from 'enzyme';
import NewStaffForm from './NewStaffForm';
import React from 'react';

describe('NewStaffForm.tsx', () => {
  it('submits the form', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<NewStaffForm onSubmit={onSubmit} />);

    wrapper.simulate('submit', { some: 'data' });

    expect(onSubmit).toHaveBeenCalledWith({ some: 'data' });
  });
});
