import Main from 'atoms/Main';
import TaskForm from 'forms/TaskForm';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

interface Props {
  className?: string;
  actions: any;
  task: any;
  client: any;
}

class EditTask extends React.Component<Props, {}> {
  render() {
    const { client, task } = this.props;

    return (
      <Main>
        <h2>EditTask</h2>
        <p>
          Personalize this task better for your client by editing, adding, or
          deleting steps.
        </p>
        <TaskForm task={task} client={client} />
      </Main>
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
