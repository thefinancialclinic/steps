import { GoalList } from 'components/Goals/GoalList';
import React from 'react';
import Goal from 'components/Goals/Goal';
import { connect, History } from 'react-redux';

interface Props {
  goals: string[];
  history: History;
}

export class Goals extends React.Component<Props> {
  onEdit = () => {
    this.props.history.push('/goals/edit');
  };

  render() {
    const { goals } = this.props;
    return (
      <GoalList goals={goals}>
        {childProps => <Goal {...childProps} onEdit={this.onEdit} />}
      </GoalList>
    );
  }
}
const mapStateToProps = state => ({
  goals: state.auth.user.goals,
});

export default connect(mapStateToProps)(Goals);
