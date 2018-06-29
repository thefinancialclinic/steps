import 'jest';
import { shallow } from 'enzyme';
import { ClientNew } from './New';
import NewClientForm from '../../../forms/NewClientForm';
import * as React from 'react';
import { AlertLevel } from '../../../components/Alert/types';

declare var process;

describe('ClientNew.tsx', () => {
  it('displays an error if the client response is an error', async () => {
    const history = { push: jest.fn() };
    const createClient = jest
      .fn()
      .mockReturnValue(Promise.reject({ message: 'some error' }));
    const actions = {
      addAlert: jest.fn(),
      createClient,
      hideModal: jest.fn(),
      showModal: jest.fn(),
    };
    const wrapper = shallow(<ClientNew actions={actions} history={history} />);
    const form = wrapper.find(NewClientForm);

    form.simulate('submit');

    try {
      await process.nextTick(() => {
        expect(actions.addAlert).toHaveBeenCalledWith({
          level: AlertLevel.Error,
          message: 'some error',
          id: 'new-client-error',
        });
      });
    } catch (error) {
      return error;
    }
  });

  it('redirects to client profile if client response is success', async () => {
    const history = { push: jest.fn() };
    const createClient = jest
      .fn()
      .mockReturnValue(Promise.resolve({ client: { id: 1 } }));
    const actions = {
      addAlert: jest.fn(),
      createClient,
      hideModal: jest.fn(),
      showModal: jest.fn(),
    };
    const wrapper = shallow(<ClientNew actions={actions} history={history} />);
    const form = wrapper.find(NewClientForm);

    form.simulate('submit');

    try {
      await process.nextTick(() => {
        expect(history.push).toHaveBeenCalledWith('/clients/1');
      });
    } catch (error) {
      return error;
    }
  });
});
