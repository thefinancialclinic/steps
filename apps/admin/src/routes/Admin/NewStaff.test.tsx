import { shallow, mount } from 'enzyme';
import { NewStaff } from './NewStaff';
import * as React from 'react';
import Button from 'atoms/button';
import NewStaffForm from './NewStaffForm';
import 'jest';

describe('NewStaff.tsx', () => {
  it('renders correctly', () => {
    const createStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const addAlert = jest.fn();
    const actions = { createStaff, addAlert };
    const wrapper = shallow(
      <NewStaff actions={actions} redirect={jest.fn()} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('submits the form', () => {
    const createStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const addAlert = jest.fn();
    const actions = { createStaff, addAlert };
    const wrapper = shallow(
      <NewStaff actions={actions} redirect={jest.fn()} />
    );
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', { emails: 'test@example.com' });

    expect(actions.createStaff).toHaveBeenCalledWith(['test@example.com']);
  });

  it('splits emails and removes whitespace', () => {
    const createStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const addAlert = jest.fn();
    const actions = { createStaff, addAlert };
    const wrapper = shallow(
      <NewStaff actions={actions} redirect={jest.fn()} />
    );
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', {
      emails: 'test@example.com,test2@example.com,  test3@example.com'
    });

    expect(actions.createStaff).toHaveBeenCalledWith([
      'test@example.com',
      'test2@example.com',
      'test3@example.com'
    ]);
  });

  it('redirects back to the home page on success', () => {
    const redirect = jest.fn();
    const createStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const addAlert = jest.fn();
    const actions = { createStaff, addAlert };
    const wrapper = shallow(<NewStaff actions={actions} redirect={redirect} />);
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', { emails: 'test@example.com' });

    // process is undefined, even though it works as expected?
    process.nextTick(() => {
      expect(redirect).toHaveBeenCalled();
    });
  });

  it('displays an error message on error', () => {
    const redirect = jest.fn();
    const createStaff = jest.fn().mockReturnValue(Promise.reject('some error'));
    const addAlert = jest.fn();
    const actions = { createStaff, addAlert };
    const wrapper = shallow(<NewStaff actions={actions} redirect={redirect} />);
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', { emails: 'test@example.com' });

    // process is undefined, even though it works as expected?
    process.nextTick(() => {
      expect(addAlert).toHaveBeenCalledWith('some error', 'error');
    });
  });
});
