import { shallow, mount } from 'enzyme';
import { NewStaff } from '../NewStaff';
import * as React from 'react';
import { ReduxForm } from 'redux-form';
import Button from '../../../atoms/button';

describe('NewStaff.tsx', () => {
  it('renders correctly', () => {
    const actions = {
      createStaff: jest.fn()
    };
    const wrapper = shallow(<NewStaff actions={actions} />);

    expect(wrapper).toMatchSnapshot();
  });
});
