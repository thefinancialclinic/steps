import 'jest';
import { shallow } from 'enzyme';
import { ClientNew } from './New';
import NewClientForm from '../../../forms/NewClientForm';
import * as React from 'react';
import { AlertLevel } from '../../../components/Alert/types';

declare var process;

describe('ClientNew.tsx', () => {
  it('displays an error if the client response is an error', done => {
    const history = { push: jest.fn() };
    const createClient = jest
      .fn()
      .mockReturnValue(Promise.reject({ message: 'some error' }));
    const actions = {
      addAlert: jest.fn(),
      createClient,
    };
    const wrapper = shallow(<ClientNew actions={actions} history={history} />);
    const form = wrapper.find(NewClientForm);

    form.simulate('submit');

    process.nextTick(() => {
      expect(actions.addAlert).toHaveBeenCalledWith({
        level: AlertLevel.Error,
        message: 'some error',
        id: 'new-client-error',
      });
      done();
    });
  });

  it('redirects to /clients if client response is success', done => {
    const history = { push: jest.fn() };
    const createClient = jest.fn().mockReturnValue(Promise.resolve('success!'));
    const actions = {
      addAlert: jest.fn(),
      createClient,
    };
    const wrapper = shallow(<ClientNew actions={actions} history={history} />);
    const form = wrapper.find(NewClientForm);

    form.simulate('submit');

    process.nextTick(() => {
      expect(history.push).toHaveBeenCalledWith('/clients');
      done();
    });
  });
});
