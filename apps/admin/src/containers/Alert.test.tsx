import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import configureStore from 'redux-mock-store';
import { AlertLevel } from '../components/Alert/types';
import Alerts from './Alert';

describe('Alert.tsx', () => {
  const initialState = {
    alerts: [
      {
        level: AlertLevel.Error,
        message: 'some error',
        id: 'error-id',
      },
    ],
  };

  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('Displays an alert', () => {
    const wrapper = shallow(<Alerts store={store} />);

    expect(wrapper.children.length).toEqual(1);
  });
});
