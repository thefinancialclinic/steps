import GoalList from 'components/Goals/GoalList';
import React from 'react';
import NoGoals from 'components/Goals/NoGoals';
import { Box } from 'grid-styled';
import { Link } from 'react-router-dom';
import { Goal as GoalType } from 'components/Goals/types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGoals } from 'actions/goals';

interface Props {
  actions: {
    getGoals(): GoalType[];
  };
  goals: GoalType[];
}

export const GoalListLayout: React.SFC<{ goals: GoalType[] }> = ({ goals }) => (
  <div>
    <GoalList goals={goals} />
    <Link to="/clients/1/goals/new">New Goal</Link>
  </div>
);

export class ViewGoalList extends React.Component<Props> {
  componentWillMount() {
    this.props.actions.getGoals();
  }

  render() {
    return (
      <Box width={1} p={4}>
        {this.props.goals && this.props.goals.length > 0 ? (
          <GoalListLayout goals={this.props.goals} />
        ) : (
          <NoGoals />
        )}
      </Box>
    );
  }
}
const mapStateToProps = ({ goals }) => {
  return {
    goals,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getGoals }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewGoalList);
