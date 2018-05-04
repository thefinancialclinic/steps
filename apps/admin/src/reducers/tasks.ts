import { SET_TASKS } from 'actions/tasks';

const initialState = {
  tasks: [],
};

export default (state = initialState, action) => {

  if (action.type === SET_TASKS) {
    return {
      ...state,
      tasks: action.tasks,
    };
  }

  return state;
};
