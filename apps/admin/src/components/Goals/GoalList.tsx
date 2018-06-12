import React from 'react';
import Goal from './Goal';
import { Goal as GoalType } from './types';
import styled from 'styled-components';

interface Props {
  className?: string;
  goals: GoalType[];
}

const GoalList: React.SFC<Props> = ({ goals }) => (
  <div>
    {goals.map(goal => <StyledGoal text={goal.text} onEdit={() => {}} />)}
  </div>
);

const StyledGoal = styled(Goal)`
  margin-bottom: 2rem;
`;

export default GoalList;
