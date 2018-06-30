import React from 'react';

interface Props {
  className?: string;
  goals: string[];
  children({ text, index, key }): JSX.Element;
}

export const GoalList: React.SFC<Props> = ({ goals, children }) => (
  <div>
    {goals.map((goal, i) => {
      return children({ text: goal, index: i, key: `goal-${i}` });
    })}
  </div>
);

export default GoalList;
