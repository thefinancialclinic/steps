import { combineReducers } from 'redux';
import { reducer as storageMergeReducer } from 'redux-storage';

export default storageMergeReducer(combineReducers({
}));
