import { INVITE_STAFF } from 'actions/staff';

interface StaffState {
  invitedEmails: string[];
}

const initialState: StaffState = {
  invitedEmails: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INVITE_STAFF:
      return {
        ...state,
        invitedEmails: [...state.invitedEmails, ...action.emails]
      };
    default:
      return state;
  }
};
