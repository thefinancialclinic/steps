import { setTaskStatus } from 'actions/tasks';
import TaskList from 'components/Tasks/TaskList';
import { filterById } from 'helpers';
import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router-dom';
import { Task } from 'reducers/tasks';
import { bindActionCreators } from 'redux';

interface Props {
  tasks: Task[];
  match: Match;
  actions: { setTaskStatus };
}

class Tasks extends React.Component<Props, {}> {
  render() {
    const { tasks, match, actions } = this.props;
    return (
      <TaskList
        items={tasks}
        setTaskStatus={actions.setTaskStatus}
        url={match.url}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  tasks: filterById(state.tasks.tasks, state.auth.user.id, 'user_id'),
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setTaskStatus }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
