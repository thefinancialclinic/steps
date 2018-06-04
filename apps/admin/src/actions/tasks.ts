import axios from 'axios';

type DispatchFn = (any) => any;

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

const CREATE_TASK = 'CREATE_TASK';
export const createTask = async (data): Promise<any> => {
  await axios.post(apiUrl + '/tasks', data);
  return { type: 'foo' };
};

const GET_TASKS = 'GET_TASKS';
export const getTasks = (): DispatchFn => async dispatch => {
  const tasks = await axios.get(apiUrl + '/tasks');
  return dispatch(setTasks(tasks.data));
};

export const SET_TASKS = 'SET_TASKS';
export const setTasks = tasks => {
  return {
    type: SET_TASKS,
    tasks
  };
};

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (id): DispatchFn => async dispatch => {
  const tasks = await axios.delete(`${apiUrl}/tasks/${id}`);
  return { type: DELETE_TASK, tasks };
};

