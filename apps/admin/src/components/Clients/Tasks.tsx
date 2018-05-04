import React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTasks, setTasks } from 'actions/tasks';
import styled from 'styled-components';
import Task from './Task';

interface Props {
  className?: string;
  actions: any;
  tasks: any;
}

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((task, index) => (
        <Task key={`item-${index}`} index={index} value={task.content} />
      ))}
    </ul>
  );
});

class Tasks extends React.Component<Props, {}> {
  componentWillMount () {
    this.props.actions.getTasks();
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.actions.setTasks(
      arrayMove(this.props.tasks, oldIndex, newIndex),
    );
  };

  render () {
    return (
      <div>
        <h2>Tasks</h2>
        <Link to="/clients/1/tasks/new">New Task</Link>
        <SortableList items={this.props.tasks} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

const StyledTasks = styled(Tasks)`
display: flex;
`;

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getTasks, setTasks }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledTasks);
