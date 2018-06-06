import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as storageMergeReducer } from 'redux-storage';
import clients from './clients';
import alerts from './alerts';
import user from './user';
import tasks from './tasks';

export default storageMergeReducer(
  combineReducers({
    form: formReducer,
    clients,
    tasks,
    user,
    alerts
  })
);
