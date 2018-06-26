import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { NewStaff } from './NewStaff';
import NewStaffForm from 'forms/NewStaffForm';

declare var process;

describe('NewStaff.tsx', () => {
  const addAlert = jest.fn();
  const hideModal = jest.fn();

  it('submits the form', () => {
    const inviteStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const actions = {
      inviteStaff,
      addAlert,
      hideModal,
    };
    const wrapper = shallow(<NewStaff actions={actions} />);
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', { emails: 'test@example.com' });

    expect(actions.inviteStaff).toHaveBeenCalledWith(['test@example.com']);
  });

  it('splits emails and removes whitespace', () => {
    const inviteStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const actions = {
      inviteStaff,
      addAlert,
      hideModal,
    };
    const wrapper = shallow(<NewStaff actions={actions} />);
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', {
      emails: 'test@example.com,test2@example.com,  test3@example.com',
    });

    expect(actions.inviteStaff).toHaveBeenCalledWith([
      'test@example.com',
      'test2@example.com',
      'test3@example.com',
    ]);
  });

  it('displays an error message on error', async done => {
    const inviteStaff = jest
      .fn()
      .mockReturnValue(Promise.reject({ message: 'some error' }));
    const actions = { inviteStaff, addAlert, hideModal };
    const wrapper = shallow(<NewStaff actions={actions} />);
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', { emails: 'test@example.com' });

    await process.nextTick(() => {
      expect(addAlert).toHaveBeenCalledWith({
        message: 'some error',
        id: 'new-staff-error',
        level: 'error',
      });
      done();
    });
  });
});
