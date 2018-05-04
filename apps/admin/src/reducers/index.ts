import { combineReducers } from 'redux';
import { reducer as storageMergeReducer } from 'redux-storage';
import clients from './clients';
import tasks from './tasks';

export default storageMergeReducer(combineReducers({
  clients,
  tasks
}));
