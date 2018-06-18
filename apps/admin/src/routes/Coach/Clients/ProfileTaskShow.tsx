import React from 'react';
import { Location } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTask } from 'actions/tasks';
import TaskDetails from 'components/Tasks/TaskDetails';
import { findById } from 'helpers';

interface Props {
  className?: string;
  client: any;
  task: any;
  location: Location;
  actions: { deleteTask };
}

const steps = task => {
  return task.steps.map((step, index) => (
    <p key={`step-${index}`}>{step.text}</p>
  ));
};

const TaskShow: React.SFC<Props> = props => {
  return (
    <TaskDetails
      client={props.client}
      task={props.task}
      actions={props.actions}
      location={props.location}
    />
  );
};

const mapStateToProps = (state, props) => ({
  task: findById(state.tasks.tasks, props.match.params.taskId),
  client: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ deleteTask }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskShow);
