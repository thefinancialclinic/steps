import { Box } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { createTask } from 'actions/tasks';
import Main from 'atoms/Main';

interface Props {
  className?: string;
  actions: any;
}

class NewTask extends React.Component<Props, {}> {
  newTask = e => {
    e.preventDefault();
    const content: any = this.refs.content;

    this.props.actions.createTask({
      steps: { foo: 'bar' },
      content: content.value,
    });
  };

  render() {
    return (
      <Main>
        <h2>Create New Task</h2>
        <p>
          Create a personalized task for your client after you've talked with
          them to understand their financial goal(s). In the rationale, explain
          how the task is connected to their goal(s). List the individual steps
          they will need to take to achieve their task, and include any
          references or referrals available to help.
        </p>
        {/* TODO: Task form needs client */}
        {/* <TaskForm>
            <Box>STEPS</Box>
          </TaskForm> */}
      </Main>
    );
  }
}

const StyledNewTask = styled(NewTask)``;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createTask }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(StyledNewTask);
