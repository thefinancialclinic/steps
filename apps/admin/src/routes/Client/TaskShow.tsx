import React from 'react';
import { Flex, Box } from 'grid-styled';
import { Location, History } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTask, getTasks, addTask } from 'actions/tasks';
import TaskDetails from 'components/Tasks/TaskDetails';
import { findById } from 'helpers';
import BackButton from 'atoms/Buttons/BackButton';
import { addAlert } from 'actions/alerts';
import { showModal, hideModal } from 'actions/modals';
import { Task } from 'reducers/tasks';
import { User } from 'reducers/auth';
import { AlertLevel } from 'components/Alert/types';

interface Props {
  className?: string;
  user: User;
  task: Task;
  location: Location;
  actions: { deleteTask; getTasks; showModal; hideModal; addAlert; addTask };
  history: History;
}

class TaskShow extends React.Component<Props> {
  componentWillMount() {
    const { actions } = this.props;
    this.props.actions.getTasks().catch(err => {
      actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'client-task-show-error',
      });
    });
  }

  render() {
    const { user, task, actions, location, history } = this.props;
    return (
      <Flex flexDirection="column">
        <Box mb={20}>
          <BackButton to={`/tasks`} />
        </Box>
        <TaskDetails
          history={history}
          user={user}
          task={task}
          actions={actions}
          location={location}
        />
      </Flex>
    );
  }
}

const mapStateToProps = (state, props) => ({
  task: findById(state.tasks.tasks, props.match.params.id),
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { deleteTask, getTasks, addAlert, showModal, hideModal, addTask },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskShow);
