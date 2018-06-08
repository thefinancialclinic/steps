import 'jest';
import { shallow } from 'enzyme';
import NewClientForm from './NewClientForm';
import React from 'react';

describe('NewClientForm.tsx', () => {
  it('submits the form', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<NewClientForm onSubmit={onSubmit} />);

    wrapper.simulate('submit', { some: 'data' });

    expect(onSubmit).toHaveBeenCalledWith({ some: 'data' });
  });
});
