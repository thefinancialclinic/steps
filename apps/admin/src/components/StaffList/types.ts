export interface PendingInvite {
  pendingInvite: true;
  email: string;
}

export type Staff<T> = {
  pendingInvite: false;
} & T;

export interface User {
  name: string;
  permissionLevel: PermissionLevel;
  email: string;
}

export enum PermissionLevel {
  Administrator = 'administrator',
  Coach = 'coach',
}

export type StaffMember = PendingInvite | Staff<User>;
