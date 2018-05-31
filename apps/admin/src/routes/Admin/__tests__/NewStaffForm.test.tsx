import { shallow } from 'enzyme';
import { NewStaffForm } from '../NewStaffForm';
import * as React from 'react';
import Button from '../../../atoms/button';

describe('NewStaff.tsx', () => {
  it('renders correctly', () => {
    const onSubmit = jest.fn();
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <NewStaffForm onSubmit={onSubmit} handleSubmit={handleSubmit} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
