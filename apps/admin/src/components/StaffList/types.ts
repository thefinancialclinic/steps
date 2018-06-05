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
}

export enum PermissionLevel {
  Administrator = 'administrator',
  Coach = 'coach'
}
