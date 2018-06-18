import Main from 'atoms/Main';
import TaskForm from 'forms/TaskForm';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTask } from 'actions/tasks';
import { findById } from 'helpers';

interface Props {
  className?: string;
  actions: any;
  task: any;
  client: any;
  history: any;
}

class EditTask extends React.Component<Props, {}> {
  handleSubmit = async task => {
    try {
      const response = await this.props.actions.addTask({
        ...task,
        user_id: this.props.client.id,
      });

      this.props.history.push(
        `/clients/${this.props.client.id}/tasks`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { client, task } = this.props;

    return (
      <Main>
        <h2>Add Task</h2>
        <p>
          Personalize this task better for your client by editing, adding, or
          deleting steps.
        </p>
        <TaskForm task={task} client={client} onSubmit={this.handleSubmit} />
      </Main>
    );
  }
}

// TODO: Need to request the specific task in order to get the steps
const mapStateToProps = (state, props) => ({
  task: findById(state.tasks.tasks, props.match.params.taskId),
  client: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTask }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTask);
