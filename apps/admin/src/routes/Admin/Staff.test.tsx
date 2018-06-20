import { shallow } from 'enzyme';
import { Staff } from './Staff';
import React from 'react';

describe('Staff.tsx', () => {
  it('gets coaches', () => {
    const actions = {
      getCoaches: jest.fn().mockReturnValue(Promise.resolve()),
      addAlert: jest.fn(),
    };
    shallow(<Staff coaches={[]} invitedCoaches={[]} actions={actions} />);

    expect(actions.getCoaches).toHaveBeenCalled();
  });

  it('displays an error if get coaches fails', done => {
    const actions = {
      getCoaches: jest
        .fn()
        .mockReturnValue(Promise.reject({ message: 'some error' })),
      addAlert: jest.fn(),
    };
    shallow(<Staff coaches={[]} invitedCoaches={[]} actions={actions} />);

    setTimeout(() => {
      expect(actions.addAlert).toHaveBeenCalled();
      done();
    }, 0);
  });
});
