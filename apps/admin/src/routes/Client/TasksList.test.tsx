import 'jest';
import React from 'react';
import { Tasks } from './TasksList';
import { shallow } from 'enzyme';
import { Task } from 'reducers/tasks';
import TaskListItem from 'components/Tasks/TaskListItem';

describe('TasksList.tsx', () => {
  it('gets tasks', () => {
    const actions = {
      getTasks: jest.fn().mockReturnValue(Promise.resolve()),
      setTaskStatus: jest.fn(),
      addAlert: jest.fn(),
    };
    shallow(<Tasks actions={actions} tasks={[]} match={{ url: 'foo/bar' }} />);

    expect(actions.getTasks).toHaveBeenCalled();
  });

  it('displays task list items', () => {
    const actions = {
      getTasks: jest.fn().mockReturnValue(Promise.resolve()),
      setTaskStatus: jest.fn(),
      addAlert: jest.fn(),
    };
    const tasks: Task[] = [
      {
        id: 1,
        title: 'My first task',
      },
      {
        id: 1,
        title: 'My second task',
      },
    ];
    const wrapper = shallow(
      <Tasks actions={actions} tasks={tasks} match={{ url: 'foo/bar' }} />,
    );

    const taskListItems = wrapper.dive().find(TaskListItem);

    expect(wrapper).toMatchSnapshot();
    expect(taskListItems).toHaveLength(2);
  });
});
