import React from 'react';
import Goal from './Goal';
import styled from 'styled-components';

interface Props {
  className?: string;
  goals: string[];
}

const GoalList: React.SFC<Props> = ({ goals }) => (
  <div>
    {goals.map((goal, i) => (
      <StyledGoal text={goal} key={i} onEdit={() => {}} />
    ))}
  </div>
);

export const StyledGoal = styled(Goal)`
  margin-bottom: 2rem;
`;

export default GoalList;
