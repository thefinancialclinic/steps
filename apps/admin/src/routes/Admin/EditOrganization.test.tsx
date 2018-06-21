import { shallow } from 'enzyme';
import { EditOrganization } from './EditOrganization';
import React from 'react';
import EditOrganizationForm from '../../forms/EditOrganizationForm';

declare var process;

describe('EditOrganization.tsx', () => {
  const history = { push: jest.fn() };

  it('updates an organization', () => {
    const actions = {
      updateOrganization: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditOrganization
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditOrganizationForm);

    form.simulate('submit', { name: 'my organization' });

    expect(actions.updateOrganization).toHaveBeenCalledWith({
      name: 'my organization',
    });
  });

  it('navigates back to profile if update user is successful', async () => {
    const actions = {
      updateOrganization: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditOrganization
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditOrganizationForm);

    await form.simulate('submit', { name: 'my organization' });

    expect(history.push).toHaveBeenCalledWith('/organization');
  });

  it('displays an alert if update organization is successful', async () => {
    const actions = {
      updateOrganization: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditOrganization
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditOrganizationForm);

    await form.simulate('submit', { name: 'my organization' });

    expect(actions.addAlert).toHaveBeenCalled();
  });

  it('displays an alert if update organization fails', async done => {
    const actions = {
      updateOrganization: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
      addAlert: jest.fn(),
    };

    const wrapper = shallow(
      <EditOrganization
        user={{ id: 1, email: 'my-email@example.com' }}
        actions={actions}
        history={history}
      />,
    );

    const form = wrapper.find(EditOrganizationForm);

    await form.simulate('submit', { name: 'my organization' });

    process.nextTick(() => {
      expect(actions.addAlert).toHaveBeenCalled();
      done();
    });
  });
});
