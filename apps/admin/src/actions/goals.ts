type DispatchFn = (any) => any;

const GET_GOALS = 'GET_GOALS';
export const getGoals = (): DispatchFn => async dispatch => {
  // get goals from API
  return dispatch(setGoals([{ text: 'one' }, { text: 'two' }]));
};

export const SET_GOALS = 'SET_GOALS';
export const setGoals = goals => {
  return {
    type: SET_GOALS,
    goals,
  };
};
