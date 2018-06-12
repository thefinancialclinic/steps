import { Alert as AlertType } from './types';
import * as React from 'react';
import { Alert } from './Alert';
import styled from 'styled-components';

interface Props {
  alerts: AlertType[];
  actions: { removeAlert };
}

export const AlertsList = ({ alerts, actions }: Props) => {
  return (
    <StyledAlerts>
      {alerts.map(({ level, message, id }, i) => {
        return (
          <Alert onClose={() => actions.removeAlert(id)} key={i} level={level}>
            {message}
          </Alert>
        );
      })}
    </StyledAlerts>
  );
};

const StyledAlerts = styled.div``;

export default AlertsList;
