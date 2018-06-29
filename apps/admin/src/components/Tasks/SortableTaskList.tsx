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

import Button from 'atoms/Buttons/Button';
import Filter, { FilterCategory } from 'components/Filter';
import NoTasks from './NoTasks';

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

  componentWillMount() {
    const categories = uniq(map(this.props.tasks, 'category')).map(
      (name: string) => ({
        name,
        active: true,
      }),
    );

    this.setState({ categories });
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

  updateCategories = category => {
    const categories = this.state.categories.map(c => {
      if (c.name !== category.name) return c;
      return { ...c, active: !c.active };
    });
    this.setState({ categories });
  };

  render() {
    const { tasks, user, match, actions } = this.props;
    if (tasks.length === 0) return <NoTasks user={user} />;

    const { categories } = this.state;
    const filteredTasks = tasks.filter(t =>
      categories.map(c => !!c.active && c.name).includes(t.category),
    );

    return (
      <Box>
        <h2>Tasks</h2>
        <Filter categories={categories} update={this.updateCategories} />
        <SortableList
          items={filteredTasks}
          onSortEnd={this.onSortEnd}
          shouldCancelStart={this.shouldCancelStart}
          setTaskStatus={this.props.actions.setTaskStatus}
          url={match.url}
        />
        <Flex justifyContent="center">
          <Link to={`/clients/${user.id}/tasks/add`}>
            <Button>Add New Task</Button>
          </Link>
        </Flex>
      </Box>
    );
  }
}
