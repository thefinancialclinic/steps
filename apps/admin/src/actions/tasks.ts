import api from 'api';

type DispatchFn = (any) => any;

export const createTask = async (data): Promise<any> => {
  try {
    await api.post('/tasks', data);
    return { type: 'foo' };
  } catch (error) {
    console.error(error);
  }
};

export const GET_TASKS = 'GET_TASKS';
export const getTasks = (): DispatchFn => async dispatch => {
  try {
    const tasks = await api.get('/tasks');
    return dispatch(setTasks(tasks.data));
  } catch (error) {
    Promise.reject(error);
  }
};

export const SET_TASKS = 'SET_TASKS';
export const setTasks = tasks => {
  return {
    type: SET_TASKS,
    tasks,
  };
};

export const ORDER_TASKS = 'ORDER_TASKS';
export const orderTasks = tasks => async dispatch => {
  try {
    dispatch({ type: ORDER_TASKS, tasks: tasks });
    return await api.put(`/tasks`, tasks);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SET_TASK_STATUS = 'SET_TASK_STATUS';
export const setTaskStatus = (task, status): DispatchFn => async dispatch => {
  const newTask = { ...task, status };
  if (status === 'COMPLETED') newTask.date_completed = new Date().toISOString();
  if (status === 'ACTIVE') newTask.date_completed = null;
  delete newTask.steps;
  try {
    await api.put(`/tasks/${task.id}`, newTask);
    return dispatch({ type: SET_TASK_STATUS, id: task.id, status });
  } catch (error) {
    return Promise.reject(error);
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
    const tasks = await api.delete(`/tasks/${id}`);
    return { type: DELETE_TASK, tasks };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ADD_TASK = 'ADD_TASK';
export const addTask = (task): DispatchFn => async dispatch => {
  try {
    const today = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const contents = {
      title: task.title,
      description: task.description || '',
      steps: task.steps || {},
      category: task.category || 'custom',
      date_created: task.date_created || today,
      date_assigned: task.date_assigned || today,
      status: task.status || 'ACTIVE',
      created_by: parseInt(task.created_by),
      user_id: parseInt(task.user_id) || null,
      original_task_id: task.id,
    };
    const newTask = await api.post('/tasks', contents);
    return {
      type: ADD_TASK,
      newTask,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const UPDATE_TASK = 'UPDATE_TASK';
export const updateTask = (task): DispatchFn => async dispatch => {
  const values = {
    id: parseInt(task.id),
    title: task.title,
    description: task.description,
    steps: task.steps,
    category: task.category,
    date_created: task.date_created,
    status: task.status,
    user_id: parseInt(task.user_id),
  };

  await api.put(`/tasks/${task.id}`, values);
  return { type: GET_TASKS };
};
