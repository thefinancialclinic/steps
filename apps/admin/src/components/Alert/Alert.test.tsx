import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { Alert } from './Alert';
import { AlertLevel } from './types';

describe('Alert', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Alert level={AlertLevel.Error}>Some alert message</Alert>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
