import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTask } from 'actions/tasks';
import TaskDetails from 'components/Tasks/TaskDetails';

interface Props {
  className?: string;
  client: any;
  task: any;
  actions: { deleteTask };
}

const steps = task => {
  return task.steps.map((step, index) => (
    <p key={`step-${index}`}>{step.text}</p>
  ));
};

const TaskShow: React.SFC<Props> = props => <TaskDetails {...props} />;

const mapStateToProps = (state, props) => ({
  task: state.tasks.tasks.find(t => (t.id = props.match.params.taskId)),
  client: state.clients.clients.find(c => (c.id = props.match.params.id)),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ deleteTask }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskShow);
