import axios from 'axios';

type DispatchFn = (any) => any;

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

const GET_GOALS = 'GET_GOALS';
export const getGoals = (): DispatchFn => async dispatch => {
  try {
    const { data } = await axios.get(apiUrl + '/goals');
    return dispatch(setGoals(data));
  } catch (err) {
    return Promise.reject(err);
  }
};

export const SET_GOALS = 'SET_GOALS';
export const setGoals = goals => {
  return {
    type: SET_GOALS,
    goals,
  };
};

export const CREATE_GOAL = 'CREATE_GOAL';
export const createGoal = (goal): DispatchFn => async dispatch => {
  try {
    await axios.post(apiUrl + '/tasks', goal);
    return dispatch(addGoal(goal));
  } catch (err) {
    return Promise.reject(err);
  }
};

export const ADD_GOAL = 'ADD_GOAL';
export const addGoal = goal => {
  return {
    type: ADD_GOAL,
    goal,
  };
};
