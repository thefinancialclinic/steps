import { SET_TASKS } from 'actions/tasks';

export type TaskStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type TaskDifficulty = 'EASY' | 'MODERATE' | 'DIFFICULT';

type Task = {
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

type Step = {
  text: string;
  note: string;
  task_id: number;
};

interface State {
  tasks: Task[];
}

const initialState = {
  tasks: [
    {
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
          task_id: 0
        }
      ]
    }
  ]
};

export default (state = initialState, action) => {
  if (action.type === SET_TASKS) {
    return {
      ...state,
      tasks: action.tasks
    };
  }

  return state;
};
