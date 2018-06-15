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

  it('does not add an alert if one already exists with the same ID', () => {
    const initialState = [
      {
        message: 'some error',
        level: AlertLevel.Error,
        id: 'unique-id',
      },
    ];

    const action = addAlert({
      message: 'some error',
      level: AlertLevel.Error,
      id: 'unique-id',
    });

    const updatedState = reducer(initialState, action);

    expect(updatedState).toHaveLength(1);
  });
});
