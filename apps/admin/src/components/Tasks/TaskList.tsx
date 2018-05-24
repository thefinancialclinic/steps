import React from 'react';
import { Flex, Box } from 'grid-styled';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTasks, setTasks } from 'actions/tasks';
import styled from 'styled-components';
import Task from './TaskListItem';
import NoTasks from './NoTasks';

interface Props {
  className?: string;
  actions: any;
  tasks: any;
}

const TaskContainer = styled.div`
  border: 1px solid blue;
  margin: 1em 0;
  padding-left: 10%;
  position: relative;

  .number {
    border-right: 1px solid blue;
    bottom: 0;
    font-size: 2em;
    left: 0;
    padding: .5em 0;
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
        <TaskContainer>
          <div className='number'>{index + 1}</div>
          <Task key={`item-${index}`} index={index} value={task.content} />
        </TaskContainer>
      ))}
    </Box>
  );
});

class TaskList extends React.Component<Props, {}> {
  componentWillMount () {
    this.props.actions.getTasks();
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.actions.setTasks(
      arrayMove(this.props.tasks, oldIndex, newIndex),
    );
  };

  render () {
    const tasks = this.props.tasks;
    const taskDisplay = tasks.length > 0 ? (
        <Box width={1} p={4}>
          <h2>Tasks</h2>
          <Link to="/clients/1/tasks/new">New Task</Link>
          <SortableList items={this.props.tasks} onSortEnd={this.onSortEnd} />
        </Box>
    ) : (
        <NoTasks></NoTasks>
      );

    return (
      <div>
        {taskDisplay}
      </div>
    );
  }
}

const StyledTaskList = styled(TaskList)`
  display: flex;
`;

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getTasks, setTasks }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledTaskList);
