import { shallow } from 'enzyme';
import React from 'react';
import TaskList from './TaskList';
import TaskListItem from './TaskListItem';
import { SortableTaskListItem } from './SortableTaskList';

describe('TaskList.tsx', () => {
  it('renders correctly', () => {
    const tasks = [
      {
        title: 'My first task',
        description: 'Task description',
      },
      {
        title: 'My second task',
        description: 'Task description',
      },
    ];
    const wrapper = shallow(
      <TaskList setTaskStatus={() => {}} items={tasks} url="foo/bar">
        {props => <TaskListItem {...props} />}
      </TaskList>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('can accept list items', () => {
    const tasks = [
      {
        title: 'My first task',
        description: 'Task description',
      },
      {
        title: 'My second task',
        description: 'Task description',
      },
    ];
    const wrapper = shallow(
      <TaskList setTaskStatus={() => {}} items={tasks} url="foo/bar">
        {props => <SortableTaskListItem {...props} />}
      </TaskList>,
    );

    const items = wrapper.find(SortableTaskListItem);

    expect(items).toHaveLength(2);
  });
});
