import { INVITE_STAFF } from 'actions/staff';

export default (state = [], action) => {
  switch (action.type) {
    case INVITE_STAFF:
      const invitedStaff = action.emails.map(email => ({
        email,
        pendingInvite: true
      }));
      return [...state, ...invitedStaff];
    default:
      return state;
  }
};
