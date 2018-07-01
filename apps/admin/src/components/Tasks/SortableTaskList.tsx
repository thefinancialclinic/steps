import React from 'react';
import { Link, Match } from 'react-router-dom';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import { Box, Flex } from 'grid-styled';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import styled from 'styled-components';

import Button from 'atoms/Buttons/Button';
import Filter, { FilterCategory } from 'components/Filter';

import TaskList from './TaskList';
import TaskListItem, { TaskListItemProps } from './TaskListItem';

export const SortableTaskListItem = SortableElement(
  (props: TaskListItemProps) => {
    return <TaskListItem {...props} />;
  },
);

interface ListProps {
  setTaskStatus;
  items: any;
  url: string;
}

const SortableList = SortableContainer((props: ListProps) => {
  return (
    <TaskList {...props}>
      {childProps => <SortableTaskListItem {...childProps} />}
    </TaskList>
  );
});

interface Props {
  actions?: any;
  tasks?: any;
  user: any;
  location: Location;
  match: Match;
}

interface State {
  categories: FilterCategory[];
}

export default class SortableTaskList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const tasks = arrayMove(this.props.tasks, oldIndex, newIndex).map(
      (task, i) => ({ ...task, order: i }),
    );

    this.props.actions.orderTasks(tasks);
  };

  shouldCancelStart = e => {
    if (
      e.target.tagName.toLowerCase() === 'a' ||
      e.target.tagName.toLowerCase() === 'i'
    ) {
      return true;
    }
  };

  render() {
    const { tasks, user, match, actions } = this.props;
    const { categories } = this.state;

    return (
      <Box>
        <h2>Tasks</h2>
        <SortableList
          items={tasks}
          onSortEnd={this.onSortEnd}
          shouldCancelStart={this.shouldCancelStart}
          setTaskStatus={this.props.actions.setTaskStatus}
          url={match.url}
        />
        <AddTaskContainer justifyContent="center">
          <Link to={`/clients/${user.id}/tasks/add`}>
            <Button>Add New Task</Button>
          </Link>
        </AddTaskContainer>
      </Box>
    );
  }
}

const AddTaskContainer = styled(Flex)`
  a {
    display: block;
  }
`;
