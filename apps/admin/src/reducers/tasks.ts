import { SET_TASKS, ADD_TASK, SET_TASK_STATUS } from 'actions/tasks';

export type TaskStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type TaskDifficulty = 'EASY' | 'MODERATE' | 'DIFFICULT';

export type Task = {
  id: number;
  title: string;
  category: string;
  description: string;
  status: TaskStatus;
  created_by: number;
  user_id: number;
  difficulty: TaskDifficulty;
  date_created: string;
  date_completed: string;
  recurring: {};
  steps: Step[];
};

export type Step = {
  text: string;
  note: string;
  task_id: number;
};

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: 0,
      title: 'string',
      category: 'string',
      description: 'string',
      status: 'ACTIVE',
      created_by: 0,
      user_id: 0,
      difficulty: 'EASY',
      date_created: '2018-06-04T14:44:14.901Z',
      date_completed: '2018-06-04T14:44:14.901Z',
      recurring: {},
      steps: [
        {
          text: 'string',
          note: 'string',
          task_id: 0,
        },
      ],
    },
  ],
};

export default (state = initialState, action) => {
  if (action.type === SET_TASKS) {
    return {
      ...state,
      tasks: action.tasks,
    };
  }

  if (action.type === ADD_TASK) {
    return {
      ...state,
      tasks: [...state.tasks, action.task],
    };
  }

  if (action.type === SET_TASK_STATUS) {
    return {
      ...state,
      tasks: state.tasks.map(task => {
        if (task.id !== action.id) return task;
        return { ...task, status: action.status };
      }),
    };
  }

  return state;
};
