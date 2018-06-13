import 'jest';
import { addAlert } from '../actions/alerts';
import { AlertLevel } from '../components/Alert/types';
import { removeAlert } from './../actions/alerts';
import reducer from './alerts';

describe('alerts reducer', () => {
  it('adds an alert', () => {
    const initialState = [];
    const action = addAlert({
      message: 'some error',
      level: AlertLevel.Error,
      id: 'id',
    });

    const updatedState = reducer(initialState, action);

    expect(updatedState).toContainEqual({
      id: 'id',
      message: 'some error',
      level: 'error',
    });
  });

  it('removes an alert', () => {
    const initialState = [
      {
        id: 'id',
        message: 'some error',
        level: 'error',
      },
    ];
    const action = removeAlert('id');

    const updatedState = reducer(initialState, action);

    expect(updatedState).toHaveLength(0);
  });
});
