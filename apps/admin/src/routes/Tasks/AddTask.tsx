import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import { blue, brown, green, grey, pink } from 'styles/colors';
import styled from 'styled-components';
import Filter from 'atoms/Filter';
import TaskTemplate from 'components/Tasks/TaskTemplate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Task } from 'reducers/tasks';
import { Client } from 'reducers/clients';
import { addTask } from 'actions/tasks';

interface Props {
  className?: string;
  client: Client;
  tasks: Task[];
  actions: { addTask };
}

const StyledLink = styled.span`
  a {
    color: ${grey};
    font-size: 0.8em;
    margin-left: 1em;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

class AddTask extends React.Component<Props, {}> {
  render() {
    return (
      <Box width={1}>
        <h2>Add New Task</h2>
        <Filter
          categories={[
            { name: 'debt', active: true },
            { name: 'budget', active: false }
          ]}
        />
        <Flex alignItems="center">
          <h3>Task</h3>{' '}
          <StyledLink>
            <Link to="/">Sort by last used</Link>
          </StyledLink>
        </Flex>
        {this.props.tasks.map((task, i) => {
          const userTask = { ...task, user_id: this.props.client.id };
          delete userTask.steps;

          return (
            <TaskTemplate
              task={userTask}
              key={i}
              addTask={this.props.actions.addTask}
            />
          );
        })}
      </Box>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.tasks,
  client: state.clients.clients.find(c => c.id = props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTask }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask);
