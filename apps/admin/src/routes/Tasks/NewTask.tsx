import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTask } from 'actions/tasks';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import Button from 'atoms/Button';
import Panel from 'atoms/Panel';
import StackedInputRow from 'components/Forms/StackedInputRow';
import TaskForm from 'components/Tasks/TaskForm';
import TaskStep from 'components/Tasks/TaskStep';

interface Props {
  className?: string;
  actions: any;
}

class NewTask extends React.Component<Props, {}> {
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
        <Box width={1}>
          <h2>Create New Task</h2>
          <p>
            Create a personalized task for your client after you've talked with them
            to understand their financial goal(s). In the rationale, explain how the task is
            connected to their goal(s). List the individual steps they will need to take
            to achieve their task, and include any references or referrals available to help.
          </p>
          <TaskForm badgeText='custom'>
            <Box>STEPS</Box>
            {/* TODO: iterate over steps and make the count equal the index */}
            <TaskStep count={1}></TaskStep>
          </TaskForm>
        </Box>
    );
  }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createTask }, dispatch)
});

const StyledNewTask = styled(NewTask)`
`;

export default connect(mapStateToProps, mapDispatchToProps)(StyledNewTask);
