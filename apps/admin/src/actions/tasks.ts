import axios from 'axios';

type DispatchFn = (any) => any;

const CREATE_TASK = 'CREATE_TASK';
export const createTask = async (data): Promise<any> => {
  await axios.post('http://localhost:3001/tasks', data);
  return { type: 'foo' };
};

const GET_TASKS = 'GET_TASKS';
export const getTasks = (): DispatchFn => async dispatch => {
  const tasks = await axios.get('http://localhost:3001/tasks');
  return dispatch(setTasks(tasks.data));
};

export const SET_TASKS = 'SET_TASKS';
export const setTasks = tasks => {
  return {
    type: SET_TASKS,
    tasks
  };
};
