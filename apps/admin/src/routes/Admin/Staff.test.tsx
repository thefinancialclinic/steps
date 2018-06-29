import { shallow } from 'enzyme';
import { Staff } from './Staff';
import React from 'react';
import 'jest';

describe('Staff.tsx', () => {
  it('gets coaches', () => {
    const actions = {
      getCoaches: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
      resendInvite: jest.fn(),
      deleteCoach: jest.fn(),
      updatePermissions: jest.fn(),
      showModal: jest.fn(),
      hideModal: jest.fn(),
    };
    shallow(<Staff coaches={[]} actions={actions} />);

    expect(actions.getCoaches).toHaveBeenCalled();
  });

  it('displays an error if get coaches fails', done => {
    const actions = {
      getCoaches: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
      addAlert: jest.fn(),
      resendInvite: jest.fn(),
      deleteCoach: jest.fn(),
      updatePermissions: jest.fn(),
      showModal: jest.fn(),
      hideModal: jest.fn(),
    };
    shallow(<Staff coaches={[]} actions={actions} />);

    setTimeout(() => {
      expect(actions.addAlert).toHaveBeenCalled();
      done();
    }, 0);
  });
});
