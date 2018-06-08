import { Alert as AlertType } from './types';
import * as React from 'react';
import { Alert } from './Alert';
import styled from 'styled-components';

interface Props {
  alerts: AlertType[];
}

export const AlertsList = ({ alerts }: Props) => {
  return (
    <StyledAlerts>
      {alerts.map(({ level, message }, i) => {
        return (
          <Alert key={i} level={level}>
            {message.toString()}
            {/* this is temporary until we figure out a redux store issue */}
          </Alert>
        );
      })}
    </StyledAlerts>
  );
};

const StyledAlerts = styled.div``;

export default AlertsList;
