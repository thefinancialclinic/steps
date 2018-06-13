import { SET_GOALS } from 'actions/goals';

export default (state = [], action) => {
  switch (action.type) {
    case SET_GOALS:
      return action.goals;
    default:
      return state;
  }
};
