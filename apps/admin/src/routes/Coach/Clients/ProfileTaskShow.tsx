import React from 'react';
import { Location } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTask, getTasks } from 'actions/tasks';
import TaskDetails from 'components/Tasks/TaskDetails';
import { findById } from 'helpers';

interface Props {
  className?: string;
  client: any;
  task: any;
  location: Location;
  actions: { deleteTask; getTasks };
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
    const { client, task, actions, location } = this.props;
    return (
      <TaskDetails
        client={client}
        task={task}
        actions={actions}
        location={location}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  task: findById(state.tasks.tasks, props.match.params.taskId),
  client: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ deleteTask, getTasks }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskShow);
