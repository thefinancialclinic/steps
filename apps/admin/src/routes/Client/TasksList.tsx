import { setTaskStatus, getTasks } from 'actions/tasks';
import TaskList from 'components/Tasks/TaskList';
import { filterById } from 'helpers';
import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router-dom';
import { Task } from 'reducers/tasks';
import { bindActionCreators } from 'redux';
import { AlertLevel } from 'components/Alert/types';
import { addAlert } from 'actions/alerts';
import TaskListItem from 'components/Tasks/TaskListItem';

interface Props {
  tasks: Task[];
  match: Match;
  actions: { setTaskStatus; getTasks; addAlert };
}

class Tasks extends React.Component<Props> {
  componentWillMount() {
    const { actions } = this.props;
    actions.getTasks().catch(err => {
      actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'client-task-list-error',
      });
    });
  }

  render() {
    const { tasks, match, actions } = this.props;
    return (
      <TaskList
        items={tasks}
        setTaskStatus={actions.setTaskStatus}
        url={match.url}
      >
        {childProps => <TaskListItem {...childProps} />}
      </TaskList>
    );
  }
}

const mapStateToProps = state => ({
  tasks: filterById(state.tasks, state.auth.user.id, 'user_id'),
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setTaskStatus, getTasks, addAlert }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
