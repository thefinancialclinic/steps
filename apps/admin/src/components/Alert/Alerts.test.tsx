import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { Alerts } from './Alerts';
import { AlertLevel } from './types';
import Alert from './Alert';

describe('Alerts.tsx', () => {
  it('renders correctly', () => {
    const alerts = [
      {
        message: 'some warning',
        level: AlertLevel.Warning
      },
      {
        message: 'some error',
        level: AlertLevel.Error
      }
    ];
    const wrapper = shallow(<Alerts alerts={alerts} />);

    expect(wrapper.find(Alert)).toHaveLength(2);
  });
});
