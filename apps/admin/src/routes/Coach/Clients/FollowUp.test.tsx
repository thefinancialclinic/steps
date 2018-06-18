import { FollowUp, DateProvider } from './FollowUp';
import { shallow } from 'enzyme';
import React from 'react';
import FollowUpForm from 'forms/FollowUpForm';
import moment from 'moment';

class MockDateProvider implements DateProvider {
  today(): moment.Moment {
    return moment.utc('2018-01-01');
  }
}

describe('FollowUp.tsx', () => {
  const history = { push: jest.fn() };
  it('sets a follow up date', () => {
    const setClientFollowUpDate = jest.fn().mockReturnValue(Promise.resolve());
    const actions = {
      setClientFollowUpDate,
      addAlert: jest.fn(),
    };
    const client = {
      id: 1,
    };
    const wrapper = shallow(
      <FollowUp
        history={history}
        actions={actions}
        client={client}
        dateProvider={new MockDateProvider()}
      />,
    );
    const form = wrapper.find(FollowUpForm);

    form.simulate('submit', { weeks: '1' });

    expect(actions.setClientFollowUpDate).toHaveBeenCalledWith(
      client,
      moment.utc('2018-01-01').add(1, 'weeks'),
    );
  });

  it('navigates back to the client profile on success', () => {
    const setClientFollowUpDate = jest.fn().mockReturnValue(Promise.resolve());
    const actions = {
      setClientFollowUpDate,
      addAlert: jest.fn(),
    };
    const client = {
      id: 1,
    };
    const wrapper = shallow(
      <FollowUp
        history={history}
        actions={actions}
        client={client}
        dateProvider={new MockDateProvider()}
      />,
    );
    const form = wrapper.find(FollowUpForm);

    form.simulate('submit', { weeks: '1' });

    expect(history.push).toHaveBeenCalledWith('/clients/1');
  });

  it('displays an error message on failure', () => {
    const setClientFollowUpDate = jest
      .fn()
      .mockReturnValue(Promise.reject({ message: 'some error' }));
    const actions = {
      setClientFollowUpDate,
      addAlert: jest.fn(),
    };
    const client = {
      id: 1,
    };
    const wrapper = shallow(
      <FollowUp
        history={history}
        actions={actions}
        client={client}
        dateProvider={new MockDateProvider()}
      />,
    );
    const form = wrapper.find(FollowUpForm);

    form.simulate('submit', { weeks: '1' });

    setTimeout(() => {
      expect(actions.addAlert).toHaveBeenCalledWith('some error');
    }, 0);
  });
});
