export enum AlertLevel {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface Alert {
  level: AlertLevel;
  message: string;
  id: string;
}
