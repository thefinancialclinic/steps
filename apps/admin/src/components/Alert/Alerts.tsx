import { Alert as AlertType } from './types';
import * as React from 'react';
import { Alert } from './Alert';
import styled from 'styled-components';

interface Props {
  alerts: AlertType[];
}

export const Alerts = ({ alerts }: Props) => {
  return (
    <StyledAlerts>
      {alerts.map(({ level, message }, i) => {
        return (
          <Alert key={i} level={level}>
            {message}
          </Alert>
        );
      })}
    </StyledAlerts>
  );
};

const StyledAlerts = styled.div``;

export default Alerts;
