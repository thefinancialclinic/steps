import { SET_GOALS, ADD_GOAL } from 'actions/goals';

export default (state = [], action) => {
  switch (action.type) {
    case SET_GOALS:
      return action.goals;
    case ADD_GOAL:
      return [...state, action.goal];
    default:
      return state;
  }
};
