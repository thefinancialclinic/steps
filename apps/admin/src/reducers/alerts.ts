export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      if (state.find(alert => alert.id == action.alert.id)) {
        return state;
      }
      return [...state, action.alert];

    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== action.id);

    default:
      return state;
  }
};
