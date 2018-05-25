import React from 'react';
import { Flex, Box } from 'grid-styled';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
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
  actions: any;
  tasks: any;
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
          <Task key={`item-${index}`} index={index} value={task.title} id={task.id} />
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
        <Box width={1}>
          <h2>Tasks</h2>
          <SortableList items={this.props.tasks} onSortEnd={this.onSortEnd} />
          <Flex justifyContent='center'>
            <ButtonLink to="/clients/6/tasks/add">Add New Task</ButtonLink>
          </Flex>
        </Box>
    ) : (
        <NoTasks></NoTasks>
      );

    return (
      <div>{taskDisplay}</div>
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
