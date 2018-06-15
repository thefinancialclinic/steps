import Button from 'atoms/Buttons/Button';
import { Box } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Match } from 'react-router-dom';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { grey, mediumBlue, white } from 'styles/colors';
import NoTasks from './NoTasks';
import TaskListItem from './TaskListItem';
import { getTasks, setTasks, setTaskStatus } from 'actions/tasks';
import { Flex } from 'grid-styled';

const TaskContainer = styled.div`
  border: 1px solid ${grey};
  margin: 1em 0;
  padding-left: 10%;
  position: relative;

  .number {
    background-color: ${white};
    border-right: 1px solid ${grey};
    bottom: 0;
    font-size: 2em;
    left: 0;
    padding: 0.5em 0;
    position: absolute;
    text-align: center;
    top: 0;
    width: 10%;
  }

  &.completed {
    div {
      background-color: ${mediumBlue};
    }
  }
`;

interface ListProps {
  setTaskStatus;
  items: any;
  url: string;
}

const SortableList = SortableContainer(
  ({ items, setTaskStatus, url }: ListProps) => {
    let taskClass = status => {
      return status === 'COMPLETED' ? 'compelted' : 'active';
    };
    return (
      <Box>
        {items.map((task, index) => (
          <TaskContainer key={index} className={taskClass(task.status)}>
            <div className="number">{index + 1}</div>
            <TaskListItem
              key={`item-${index}`}
              setTaskStatus={setTaskStatus}
              index={index}
              task={task}
              url={url}
            />
          </TaskContainer>
        ))}
      </Box>
    );
  },
);

interface Props {
  className?: string;
  actions?: any;
  tasks?: any;
  client: any;
  match: Match;
}

export class TaskList extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getTasks();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.actions.setTasks(
      arrayMove(this.props.tasks, oldIndex, newIndex),
    );
  };

  shouldCancelStart = e => {
    if (
      e.target.tagName.toLowerCase() === 'a' ||
      e.target.tagName.toLowerCase() === 'input'
    ) {
      return true;
    }
  };

  render() {
    const { tasks, client, match } = this.props;

    const taskDisplay =
      tasks.length > 0 ? (
        <Box width={1}>
          <h2>Tasks</h2>
          <SortableList
            items={tasks}
            onSortEnd={this.onSortEnd}
            shouldCancelStart={this.shouldCancelStart}
            setTaskStatus={this.props.actions.setTaskStatus}
            url={match.url}
          />
          <Flex justifyContent="center">
            <Link to={`/clients/${client.id}/tasks/add`}>
              <Button>Add New Task</Button>
            </Link>
          </Flex>
        </Box>
      ) : (
        <NoTasks client={client} />
      );

    return <div>{taskDisplay}</div>;
  }
}

export const StyledTaskList = styled(TaskList)`
  display: flex;
`;

export class ConnectedTaskList extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getTasks();
  }

  render() {
    return <TaskList {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.tasks.filter(
      t => t.user_id == (props.client.id || props.match.params.id),
    ),
    client: state.clients.clients.find(
      c => c.id == (props.client.id || props.match.params.id),
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getTasks, setTasks, setTaskStatus }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedTaskList);
