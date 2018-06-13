export enum AlertLevel {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface Alert {
  level: AlertLevel;
  message: string;
  id: string;
}
