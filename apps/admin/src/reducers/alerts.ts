export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return [...state, action.alert];

    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== action.id);

    default:
      return state;
  }
};
