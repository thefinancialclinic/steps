import { combineReducers } from 'redux';
import { reducer as storageMergeReducer } from 'redux-storage';
import clients from './clients';
import alerts from './alerts';
import auth from './auth';
import tasks from './tasks';
import staff from './staff';

export default storageMergeReducer(
  combineReducers({
    clients,
    tasks,
    auth,
    alerts,
    staff,
  }),
);
