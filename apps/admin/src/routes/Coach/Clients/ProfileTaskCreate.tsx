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
  org: any;
  history: any;
  task: Task;
}

class EditTask extends React.Component<Props, {}> {
  handleSubmit = async task => {
    try {
      const response = await this.props.actions.addTask({
        ...task,
      });

      this.props.history.push(
        `/clients/${this.props.user.id}/tasks/${response.newTask.data.id}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { user, org } = this.props;

    const task: Task = {
      id: null,
      title: null,
      category: null,
      description: null,
      status: null,
      created_by: org.id,
      user_id: user.id,
      difficulty: null,
      date_created: null,
      date_completed: null,
      recurring: {},
      steps: [],
      order: 1,
    };

    return (
      <Main>
        <h2>Create New Task</h2>
        <p>
          Create a personalized task for your client after you've talked with them to understand their financial goal(s). In the rationale, explain how the task is connected to their goal(s). List the individual steps they will need to achieve their task, and include any references or referrals available to help.
        </p>
        <TaskForm task={task} user={user} onSubmit={this.handleSubmit} />
      </Main>
    );
  }
}

// TODO: Need to request the specific task in order to get the steps
const mapStateToProps = (state, props) => ({
  task: findById(state.tasks, props.match.params.taskId),
  user: findById(state.clients.clients, props.match.params.id),
  org: state.auth.org,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTask }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTask);
