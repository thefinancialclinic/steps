import client from 'client';

type DispatchFn = (any) => any;

export const createTask = async (data): Promise<any> => {
  await client.post('/tasks', data);
  return { type: 'foo' };
};

export const getTasks = (): DispatchFn => async dispatch => {
  const tasks = await client.get('/tasks');
  return dispatch(setTasks(tasks.data));
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
    await client.put(`/tasks/${task.id}`, newTask);
    return dispatch({ type: SET_TASK_STATUS, id: task.id, status });
  } catch (err) {
    return Promise.reject(err);
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
    const tasks = await client.delete(`/tasks/${id}`);
    return { type: DELETE_TASK, tasks };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const ADD_TASK = 'ADD_TASK';
export const addTask = (task): DispatchFn => async dispatch => {
  try {
    await client.post('/tasks', task);
    return {
      type: ADD_TASK,
      task,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
