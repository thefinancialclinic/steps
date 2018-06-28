import { shallow } from 'enzyme';
import React from 'react';

import TaskListItem from './TaskListItem';

describe('TaskListItem.tsx', () => {
  it('renders correctly', () => {
    const task = {
      title: 'My task',
      description: 'task description',
      status: 'ACTIVE',
    };
    const wrapper = shallow(
      <TaskListItem
        key="key"
        setTaskStatus={() => {}}
        task={task}
        url="foo/bar"
        index={1}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('can toggle the task status', () => {
    const setTaskStatus = jest.fn();
    const task = {
      title: 'My task',
      description: 'task description',
      status: 'ACTIVE',
    };
    const wrapper = shallow(
      <TaskListItem
        key="key"
        setTaskStatus={setTaskStatus}
        task={task}
        url="foo/bar"
        index={1}
      />,
    );

    const toggler = wrapper.find('.task-completed');

    toggler.simulate('click');

    expect(setTaskStatus).toHaveBeenCalledWith(task, 'COMPLETED');
  });
});
