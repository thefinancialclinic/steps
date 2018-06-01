import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { NewStaffForm } from './NewStaffForm';

describe('NewStaff.tsx', () => {
  it('renders correctly', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<NewStaffForm onSubmit={onSubmit} />);

    expect(wrapper).toMatchSnapshot();
  });
});
