export const INVITE_STAFF = 'INVITE_STAFF';
export const inviteStaff = async (emails: string[]) => {
  // TODO: send API request
  return {
    type: INVITE_STAFF,
    emails,
  };
};
