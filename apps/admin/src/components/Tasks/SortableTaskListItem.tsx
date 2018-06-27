import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { Task } from 'reducers/tasks';
import TaskListItem from './TaskListItem';

interface Props {
  key: string;
  setTaskStatus;
  index: number;
  task: Task;
  url: string;
}

export default SortableElement((props: Props) => {
  return <TaskListItem {...props} />;
});
