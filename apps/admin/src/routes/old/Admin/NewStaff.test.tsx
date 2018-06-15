import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { NewStaff } from './NewStaff';
import NewStaffForm from '../../../forms/NewStaffForm';

declare var process;

describe('NewStaff.tsx', () => {
  const history = {
    push: jest.fn(),
  };
  const addAlert = jest.fn();

  it('submits the form', () => {
    const inviteStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const actions = {
      inviteStaff,
      addAlert,
    };
    const wrapper = shallow(<NewStaff actions={actions} history={history} />);
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
    };
    const wrapper = shallow(<NewStaff actions={actions} history={history} />);
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

  it('redirects back to the staff page on success', async () => {
    const inviteStaff = jest
      .fn()
      .mockReturnValue(Promise.resolve('some response'));
    const actions = {
      inviteStaff,
      addAlert,
    };
    const wrapper = shallow(<NewStaff actions={actions} history={history} />);
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', { emails: 'test@example.com' });

    try {
      await process.nextTick(() => {
        expect(history.push).toHaveBeenCalledWith('/admin/staff');
      });
    } catch (error) {
      return error;
    }
  });

  it('displays an error message on error', async () => {
    const inviteStaff = jest
      .fn()
      .mockReturnValue(Promise.reject({ message: 'some error' }));
    const actions = { inviteStaff, addAlert };
    const wrapper = shallow(<NewStaff actions={actions} history={history} />);
    const form = wrapper.find(NewStaffForm);

    form.simulate('submit', { emails: 'test@example.com' });

    try {
      await process.nextTick(() => {
        expect(addAlert).toHaveBeenCalledWith({
          message: 'some error',
          id: 'new-staff-error',
          level: 'error',
        });
      });
    } catch (error) {
      return error;
    }
  });
});
