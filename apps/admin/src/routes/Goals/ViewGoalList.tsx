import GoalList from 'components/Goals/GoalList';
import React from 'react';
import NoGoals from 'components/Goals/NoGoals';
import { Box } from 'grid-styled';
import { Link } from 'react-router-dom';
import { Goal as GoalType } from 'components/Goals/types';

interface Props {}

const GoalListLayout: React.SFC<{ goals: GoalType[] }> = ({ goals }) => (
  <div>
    <GoalList goals={goals} />
    <Link to="/clients/1/goals/new">New Goal</Link>
  </div>
);

class ViewGoalList extends React.Component<Props> {
  render() {
    const goals = [];
    return (
      <Box width={1} p={4}>
        {goals.length > 0 ? <GoalListLayout goals={goals} /> : <NoGoals />}
      </Box>
    );
  }
}

export default ViewGoalList;
