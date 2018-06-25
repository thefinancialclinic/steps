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

interface Props {
  className?: string;
  user: any;
  task: any;
  location: Location;
  actions: { deleteTask; getTasks; showModal; hideModal; addAlert };
}

const steps = task => {
  return task.steps.map((step, index) => (
    <p key={`step-${index}`}>{step.text}</p>
  ));
};

class TaskShow extends React.Component<Props> {
  componentWillMount() {
    this.props.actions.getTasks();
  }

  render() {
    const { user, task, actions, location } = this.props;
    return (
      <Flex flexDirection="column">
        <Box mb={20}>
          <BackButton to={`/clients/${user.id}/tasks`} />
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
  task: findById(state.tasks.tasks, props.match.params.taskId),
  user: findById(state.clients.clients, props.match.params.id),
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
