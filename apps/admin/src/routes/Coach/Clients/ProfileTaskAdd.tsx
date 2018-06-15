import { addTask } from 'actions/tasks';
import BackButton from 'atoms/Buttons/BackButton';
import Button from 'atoms/Buttons/Button';
import Header from 'atoms/Header';
import Main from 'atoms/Main';
import Filter from 'components/Filter';
import PageHeader from 'components/Headers/PageHeader';
import TaskTemplate from 'components/Tasks/TaskTemplate';
import sample from 'lodash/sample';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Client } from 'reducers/clients';
import { Task } from 'reducers/tasks';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { grey } from 'styles/colors';
import faker from 'faker';

interface Props {
  className?: string;
  client: Client;
  tasks: Task[];
  actions: { addTask };
  history: any;
  clientId?: number;
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
      <Main>
        <Header>
          <BackButton to={`/clients/${this.props.client.id}/tasks`} />
          <Button>Create New Task</Button>
        </Header>
        <PageHeader label="Add New Task" />
        <Filter
          categories={[
            { name: 'debt', active: true },
            { name: 'budget', active: false },
          ]}
        />
        <h3>Task</h3>
        {/* TODO: Extract to TaskList */}
        {this.props.tasks.map((task, i) => {
          console.log(task);
          const userTask = {
            ...task,
            user_id: this.props.client.id,
            title: faker.lorem.sentence(),
            category: sample(['income', 'expenses', 'credit', 'debt']),
            description: faker.lorem.paragraph(),
          };
          delete userTask.steps;

          return (
            <TaskTemplate
              task={userTask}
              key={i}
              addTask={this.props.actions.addTask}
              history={this.props.history}
            />
          );
        })}
      </Main>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state.tasks);
  console.log(props);
  return {
    tasks: state.tasks.tasks.filter(t => !t.user_id),
    client: state.clients.clients.find(
      c => (c.id = props.clientId || props.match.params.id),
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTask }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddTask));