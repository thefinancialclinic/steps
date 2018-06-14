import axios from 'axios';

type DispatchFn = (any) => any;

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

const CREATE_TASK = 'CREATE_TASK';
export const createTask = async (data): Promise<any> => {
  try {
    await axios.post(apiUrl + '/tasks', data);
    return { type: 'foo' };
  } catch (error) {
    console.error(error);
  }
};

const GET_TASKS = 'GET_TASKS';
export const getTasks = (): DispatchFn => async dispatch => {
  try {
    const tasks = await axios.get(apiUrl + '/tasks');
    return dispatch(setTasks(tasks.data));
  } catch (error) {
    console.error(error);
  }
};

export const SET_TASKS = 'SET_TASKS';
export const setTasks = tasks => {
  return {
    type: SET_TASKS,
    tasks,
  };
};

export const SET_TASK_STATUS = 'SET_TASK_STATUS';
export const setTaskStatus = (task, status): DispatchFn => async dispatch => {
  const newTask = { ...task, status };
  delete newTask.steps;

  try {
    const tasks = await axios.put(`${apiUrl}/tasks/${task.id}`, newTask);
    return dispatch({ type: SET_TASK_STATUS, id: task.id, status });
  } catch (error) {
    console.error(error);
  }
};

export const completeTask = id => {
  return { type: SET_TASK_STATUS, id, status: 'COMPLETED' };
};

export const setTaskActive = (id, status) => {
  return { type: SET_TASK_STATUS, id, status: 'ACTIVE' };
};

export const setTaskArchived = (id, status) => {
  return { type: SET_TASK_STATUS, id, status: 'ARCHIVED' };
};

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (id): DispatchFn => async dispatch => {
  try {
    const tasks = await axios.delete(`${apiUrl}/tasks/${id}`);
    return { type: DELETE_TASK, tasks };
  } catch (error) {
    console.error(error);
  }
};

export const ADD_TASK = 'ADD_TASK';
export const addTask = (task): DispatchFn => async dispatch => {
  try {
    const tasks = await axios.post(apiUrl + '/tasks', task);
    return {
      type: ADD_TASK,
      task,
    };
  } catch (error) {
    console.error(error);
  }
};
