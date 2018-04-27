import { combineReducers } from 'redux';
import { reducer as storageMergeReducer } from 'redux-storage';
import clients from './clients';

export default storageMergeReducer(combineReducers({
  clients
}));
