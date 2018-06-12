export type RequestStatus = 'NEEDS_ASSISTANCE' | 'REPLIED' | 'RESOLVED';

export type Request = {
  id: number;
  status: RequestStatus;
  user_id: number;
  task_id: number;
};

export type ObjectType = {
  [key: string]: string | number | boolean | ObjectType;
};

export type Message = {
  id: number;
  text: string;
  to_user: number;
  from_user: number;
  media_id?: number;
  request_id: number;
  timestamp: Date;
  responses?: ObjectType;
};
