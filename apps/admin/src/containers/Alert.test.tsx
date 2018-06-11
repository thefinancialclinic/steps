import configureStore from 'redux-mock-store';
import Alerts from './Alert';
import * as React from 'react';
import { shallow } from 'enzyme';
import { AlertLevel } from '../components/Alert/types';
import { addAlert } from '../actions/alerts';
import 'jest';

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
