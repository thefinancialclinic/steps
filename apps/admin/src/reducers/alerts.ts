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
      return state.filter(alert => {
        if (alert.id === action.id) {
          return false;
        } else {
          return true;
        }
      });

    default:
      return state;
  }
};
