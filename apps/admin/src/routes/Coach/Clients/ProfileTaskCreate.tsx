import Main from 'atoms/Main';
import TaskForm from 'forms/TaskForm';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTask } from 'actions/tasks';
import { Task } from 'reducers/tasks';
import { findById } from 'helpers';

interface Props {
  className?: string;
  actions: any;
  user: any;
  history: any;
  task: Task;
}

class EditTask extends React.Component<Props, {}> {
  handleSubmit = async task => {
    try {
      const response = await this.props.actions.addTask({
        ...task,
        user_id: null,
      });

      this.props.history.push(
        `/clients/${this.props.user.id}/tasks/${response.newTask.data.id}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { user } = this.props;

    const task = {
      id: null,
      title: null,
      category: null,
      description: null,
      status: null,
      created_by: null,
      user_id: null,
      difficulty: null,
      date_created: null,
      date_completed: null,
      recurring: {},
      steps: [],
    };

    return (
      <Main>
        <h2>Add Task</h2>
        <p>
          Personalize this task better for your user by editing, adding, or
          deleting steps.
        </p>
        <TaskForm task={task} user={user} onSubmit={this.handleSubmit} />
      </Main>
    );
  }
}

// TODO: Need to request the specific task in order to get the steps
const mapStateToProps = (state, props) => ({
  task: findById(state.tasks.tasks, props.match.params.taskId),
  user: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTask }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTask);
