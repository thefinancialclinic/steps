import React from 'react';
import Goal from './Goal';
import styled from 'styled-components';
import { Client } from 'reducers/clients';
import { History, withRouter } from 'react-router-dom';

interface Props {
  className?: string;
  goals: string[];
  client: Client;
  history: History;
}

export const GoalList: React.SFC<Props> = ({ goals, client, history }) => (
  <div>
    {goals.map((goal, i) => (
      <StyledGoal
        text={goal}
        key={i}
        onEdit={() => {
          history.push(`/clients/${client.id}/goals/${i}/edit`);
        }}
      />
    ))}
  </div>
);

export const StyledGoal = styled(Goal)`
  margin-bottom: 2rem;
`;

export default withRouter(GoalList);
