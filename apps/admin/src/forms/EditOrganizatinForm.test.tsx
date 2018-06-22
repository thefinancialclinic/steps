import { shallow } from 'enzyme';
import 'jest';
import React from 'react';
import { Form } from 'react-final-form';
import EditOrganizationForm from './EditOrganizationForm';

describe('EditOrganizationForm.tsx', () => {
  it('submits the form', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
      <EditOrganizationForm
        organization={{ name: 'my organization' }}
        onSubmit={onSubmit}
      />,
    );

    wrapper.simulate('submit', { some: 'data' });

    expect(onSubmit).toHaveBeenCalledWith({ some: 'data' });
  });

  it('fills in organization data', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
      <EditOrganizationForm
        organization={{
          name: 'my organization',
        }}
        onSubmit={onSubmit}
      />,
    );

    const form = wrapper.find(Form);

    expect(form.props().initialValues).toEqual({
      name: 'my organization',
    });
  });
});
