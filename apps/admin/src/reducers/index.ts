import { combineReducers } from 'redux';
import clients from './clients';
import alerts from './alerts';
import auth from './auth';
import tasks from './tasks';
import staff from './staff';

export default combineReducers({
  clients,
  tasks,
  auth,
  alerts,
  staff,
});
