import { shallow } from 'enzyme';
import React from 'react';
import TaskList from './TaskList';

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
      <TaskList setTaskStatus={() => {}} items={tasks} url="foo/bar" />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
