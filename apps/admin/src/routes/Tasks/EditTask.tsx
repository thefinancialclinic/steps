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
}

class EditTask extends React.Component<Props, {}> {
  newTask = (e) => {
    e.preventDefault();
    const content: any = this.refs.content;

    this.props.actions.createTask({
      steps: { foo: 'bar' },
      content: content.value,
    });
  }

  render () {
    return (
      <div>
        <h2>Edit Task</h2>
        <p>Personalize this task better for your client by editing, adding, or deleting steps.</p>
        <TaskForm badgeText='passmein'>
          <TaskStep count={1} />
        </TaskForm>
      </div>
    );
  }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createTask }, dispatch)
});

const StyledNewTask = styled(EditTask)`
`;

export default connect(mapStateToProps, mapDispatchToProps)(StyledNewTask);
