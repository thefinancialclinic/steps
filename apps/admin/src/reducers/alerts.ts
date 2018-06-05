export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return [
        ...state,
        {
          message: action.message,
          level: action.level,
          id: action.id
        }
      ];

    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== action.id);

    default:
      return state;
  }
};
