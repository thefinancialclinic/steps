import { SHOW_MODAL, HIDE_MODAL } from './../actions/modals';
const initialState = {
  visibleModalId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        visibleModalId: action.id,
      };

    case HIDE_MODAL:
      return {
        ...state,
        visibleModalId: null,
      };

    default:
      return state;
  }
};
