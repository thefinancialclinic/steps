import { shallow } from 'enzyme';
import 'jest';
import React from 'react';
import { Form } from 'react-final-form';
import EditProfileForm from './EditProfileForm';

describe('EditProfileForm.tsx', () => {
  it('submits the form', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
      <EditProfileForm user={{ id: 1 }} onSubmit={onSubmit} />,
    );

    wrapper.simulate('submit', { some: 'data' });

    expect(onSubmit).toHaveBeenCalledWith({ some: 'data' });
  });

  it('fills in user data', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
      <EditProfileForm
        user={{
          id: 1,
          first_name: 'John',
          last_name: 'Smith',
          email: 'john@example.com',
        }}
        onSubmit={onSubmit}
      />,
    );

    const form = wrapper.find(Form);

    expect(form.props().initialValues).toEqual({
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@example.com',
      id: 1,
    });
  });
});
