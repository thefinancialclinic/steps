import Goal from 'components/Goals/Goal';
import { GoalList } from 'components/Goals/GoalList';
import React from 'react';
import { connect, History } from 'react-redux';

interface Props {
  goals: string[];
}

export class Goals extends React.Component<Props> {
  render() {
    const { goals } = this.props;
    return (
      <GoalList goals={goals}>
        {childProps => <Goal {...childProps} />}
      </GoalList>
    );
  }
}
const mapStateToProps = state => ({
  goals: state.auth.user.goals,
});

export default connect(mapStateToProps)(Goals);
