import { addTask } from 'actions/tasks';
import BackButton from 'atoms/Buttons/BackButton';
import Button from 'atoms/Buttons/Button';
import Header from 'atoms/Header';
import Main from 'atoms/Main';
import Filter, { FilterCategory } from 'components/Filter';
import PageHeader from 'components/Headers/PageHeader';
import TaskTemplate from 'components/Tasks/TaskTemplate';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Client } from 'reducers/clients';
import { Task } from 'reducers/tasks';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { grey } from 'styles/colors';
import { findById } from 'helpers';
import every from 'lodash/every';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import Panel from 'atoms/Panel';
import { Flex, Box } from 'grid-styled';

interface Props {
  className?: string;
  user: Client;
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

interface State {
  categories: FilterCategory[];
}

class AddTask extends React.Component<Props, State> {
  state = {
    categories: [],
  };

  componentWillMount() {
    const categories = uniq(
      map(this.props.tasks, 'category').concat(['custom']),
    ).map((name: string) => ({
      name,
      active: true,
    }));

    this.setState({ categories });
  }

  updateCategories = category => {
    let categories = [];
    if (every(this.state.categories, 'active')) {
      categories = this.state.categories.map(c => {
        if (c.name !== category.name) {
          c.active = false;
        } else {
          c.active = true;
        }
        return c;
      });
    } else {
      categories = this.state.categories.map(c => {
        if (c.name !== category.name) return c;
        return { ...c, active: !c.active };
      });
    }

    this.setState({ categories });
  };

  render() {
    const { tasks } = this.props;
    const { categories } = this.state;
    const filteredTasks = tasks.filter(t =>
      categories.map(c => !!c.active && c.name).includes(t.category),
    );
    return (
      <Main>
        <Header>
          <BackButton to={`/clients/${this.props.user.id}/tasks`} />
          <Link to={`/clients/${this.props.user.id}/tasks/create`}>
            <Button>Create New Task</Button>
          </Link>
        </Header>
        <PageHeader label="Add New Task" />
        <Filter update={this.updateCategories} categories={categories} />
        <h3>Task</h3>
        {/* TODO: Extract to TaskList */}
        <div className="add-tasks-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, i) => {
              const userTask = {
                ...task,
                user_id: this.props.user.id,
                title: task.title,
                category: task.category,
                description: task.description,
              };
              delete userTask.steps;

              return (
                <TaskTemplate
                  task={userTask}
                  key={i}
                  user={this.props.user}
                  addTask={this.props.actions.addTask}
                  history={this.props.history}
                />
              );
            })
          ) : (
            <Flex justifyContent="center">
              <NoTasksFound>
                <h3>
                  We can't seem to find this task. Would you like to create your
                  own?
                </h3>
                <Link to={`/clients/${this.props.user.id}/tasks/create`}>
                  <Button>Create New Task</Button>
                </Link>
              </NoTasksFound>
            </Flex>
          )}
        </div>
      </Main>
    );
  }
}

const NoTasksFound = styled(Panel)`
  h3 {
    font-size: 28px;
  }
  padding-right: 8em;
  padding-left: 8em;
  width: 100%;
  text-align: center;
`;

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.filter(t => !t.user_id),
    user: findById(
      state.clients.clients,
      props.clientId || props.match.params.id,
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
