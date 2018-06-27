import React from 'react';
import { Flex, Box } from 'grid-styled';
import { Location } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTask, getTasks } from 'actions/tasks';
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
  task: Partial<Task>;
  location: Location;
  actions: { deleteTask; getTasks; showModal; hideModal; addAlert };
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
    const { user, task, actions, location } = this.props;
    console.log(this.props);
    return (
      <Flex flexDirection="column">
        <Box mb={20}>
          <BackButton to={`/tasks`} />
        </Box>
        <TaskDetails
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
    { deleteTask, getTasks, addAlert, showModal, hideModal },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskShow);
