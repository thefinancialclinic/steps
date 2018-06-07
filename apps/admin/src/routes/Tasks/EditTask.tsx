import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTask } from 'actions/tasks';
import styled from 'styled-components';
import TaskForm from 'components/Tasks/TaskForm';
import TaskStep from 'components/Tasks/TaskStep';

interface Props {
  className?: string;
  actions: any;
  task: any;
  client: any;
}

class EditTask extends React.Component<Props, {}> {
  render() {
    const { className, client, task } = this.props;

    return (
      <div className={className}>
        <h2>Edit Task</h2>
        <p>
          Personalize this task better for your client by editing, adding, or
          deleting steps.
        </p>
        <TaskForm task={task} client={client} />
      </div>
    );
  }
}

const StyledEditTask = styled(EditTask)``;

// TODO: Need to request the specific task in order to get the steps
const mapStateToProps = (state, props) => ({
  task: state.tasks.tasks.find(t => (t.id = props.match.params.taskId)),
  client: state.clients.clients.find(c => (c.id = props.match.params.id)),
});

export default connect(mapStateToProps)(StyledEditTask);
