import { addTask } from 'actions/tasks';
import Filter from 'atoms/Filter';
import TaskTemplate from 'components/Tasks/TaskTemplate';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Task } from 'reducers/tasks';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { grey } from 'styles/colors';
import { Client } from 'reducers/clients';

interface Props {
  className?: string;
  client: Client;
  tasks: Task[];
  actions: { addTask };
  history: any;
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

          <TaskTemplate
            task={userTask}
            key={i}
            addTask={this.props.actions.addTask}
            redirect={() => this.props.history.push('/')}
          />;
        })}
      </Box>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.tasks,
  client: state.clients.clients.find(c => (c.id = props.match.params.id))
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTask }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AddTask)
);
