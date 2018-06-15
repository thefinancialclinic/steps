import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { Alert, CloseIcon } from './Alert';
import { AlertLevel } from './types';

describe('Alert', () => {
  const onClose = jest.fn();

  it('renders correctly', () => {
    const wrapper = shallow(
      <Alert onClose={onClose} level={AlertLevel.Error}>
        Some alert message
      </Alert>,
    );

    expect(wrapper).toBeDefined();
  });

  it('closes the alert', () => {
    const wrapper = shallow(
      <Alert onClose={onClose} level={AlertLevel.Error}>
        Some alert message
      </Alert>,
    );

    wrapper.find(CloseIcon).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Alert onClose={onClose} level={AlertLevel.Error}>
        Some alert message
      </Alert>,
    );
  });
});
