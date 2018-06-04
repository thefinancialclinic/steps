import React from 'react';
import { Flex, Box } from 'grid-styled';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { grey, white } from 'styles/colors';
import { getTasks, setTasks } from 'actions/tasks';
import ButtonLink from 'atoms/ButtonLink';
import styled from 'styled-components';
import Task from './TaskListItem';
import NoTasks from './NoTasks';

interface Props {
  className?: string;
  actions?: any;
  tasks: any;
  client: any;
}

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
`;

const SortableList = SortableContainer(({ items }) => {
  return (
    <Box>
      {items.map((task, index) => (
        <TaskContainer key={index}>
          <div className='number'>{index + 1}</div>
          <Task key={`item-${index}`} index={index} value={task.title} id={task.id} userId={task.user_id} />
        </TaskContainer>
      ))}
    </Box>
  );
});

export class TaskList extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getTasks();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.actions.setTasks(
      arrayMove(this.props.tasks, oldIndex, newIndex)
    );
  };

  shouldCancelStart = e => {
    if (e.target.tagName.toLowerCase() === 'a') {
      return true;
    }
  };

  render() {
    const { className, tasks, client } = this.props;

    const taskDisplay =
      tasks.length > 0 ? (
        <Box width={1}>
          <h2>Tasks</h2>
          <SortableList items={tasks} onSortEnd={this.onSortEnd} shouldCancelStart={this.shouldCancelStart} />
          <Flex justifyContent='center' >
            <ButtonLink to={ `/clients/${ client.id }/tasks/add` }>Add New Task</ButtonLink>
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
  componentWillMount () {
    this.props.actions.getTasks();
  }

  render() {
    return <TaskList {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.tasks,
  client: state.clients.clients.find(c => c.id == props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getTasks, setTasks }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedTaskList);
