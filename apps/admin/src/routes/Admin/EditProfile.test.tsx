import { shallow } from 'enzyme';
import EditProfile from './EditProfile';
import EditProfileForm from '../../forms/EditProfileForm';
import React from 'react';

declare var process;

describe('EditProfile.tsx', () => {
  const history = { push: jest.fn() };

  it('updates a user', () => {
    const actions = {
      updateUser: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditProfile
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditProfileForm);

    form.simulate('submit', { id: 1, email: 'another-email@example.com' });

    expect(actions.updateUser).toHaveBeenCalledWith({
      id: 1,
      email: 'another-email@example.com',
    });
  });

  it('navigates back to profile if update user is successful', async () => {
    const actions = {
      updateUser: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditProfile
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditProfileForm);

    await form.simulate('submit', {
      id: 1,
      email: 'another-email@example.com',
    });

    expect(history.push).toHaveBeenCalledWith('/profile');
  });

  it('displays an alert if update user is successful', async () => {
    const actions = {
      updateUser: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditProfile
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditProfileForm);

    await form.simulate('submit', {
      id: 1,
      email: 'another-email@example.com',
    });

    expect(actions.addAlert).toHaveBeenCalled();
  });

  it('displays an alert if update user fails', async done => {
    const actions = {
      updateUser: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditProfile
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditProfileForm);

    await form.simulate('submit', {
      id: 1,
      email: 'another-email@example.com',
    });

    process.nextTick(() => {
      expect(actions.addAlert).toHaveBeenCalled();
      done();
    });
  });
});
