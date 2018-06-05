export const INVITE_STAFF = 'INVITE_STAFF';
export const inviteStaff = async (emails: string[]) => {
  console.log(emails);
  // send API request
  return {
    type: INVITE_STAFF,
    emails
  };
};
