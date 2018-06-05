import { ADD_ALERT, removeAlert } from './../actions/alerts';
import 'jest';
import reducer from './alerts';
import { addAlert } from '../actions/alerts';
import { AlertLevel } from '../components/Alert/types';

describe('alerts reducer', () => {
  it('adds an alert', () => {
    const initialState = [];
    const action = addAlert('some error', AlertLevel.Error, 'id');

    const updatedState = reducer(initialState, action);

    expect(updatedState).toContainEqual({
      id: 'id',
      message: 'some error',
      level: 'error'
    });
  });

  it('removes an alert', () => {
    const initialState = [
      {
        id: 'id',
        message: 'some error',
        level: 'error'
      }
    ];
    const action = removeAlert('id');

    const updatedState = reducer(initialState, action);

    expect(updatedState).toHaveLength(0);
  });
});
