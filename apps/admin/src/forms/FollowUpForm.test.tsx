import { shallow } from 'enzyme';
import FollowUpForm from './FollowUpForm';
import React from 'react';
import 'jest';
import { DateProvider } from '../helpers';
import moment from 'moment';
import { Form } from 'react-final-form';

class MockDateProvider implements DateProvider {
  today(): moment.Moment {
    return moment.utc('2018-01-01');
  }
}

describe('FollowUpForm.tsx', () => {
  it('renders correctly', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FollowUpForm onSubmit={onSubmit} saved={false} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('submits the form', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FollowUpForm onSubmit={onSubmit} saved={false} />);

    wrapper.simulate('submit', { some: 'data' });

    expect(onSubmit).toHaveBeenCalledWith({ some: 'data' });
  });

  it('sets the initial form value', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
      <FollowUpForm
        onSubmit={onSubmit}
        saved={true}
        dateProvider={new MockDateProvider()}
        followUpDate={moment.utc('2018-01-08')}
      />,
    );

    const form = wrapper.find(Form);
    expect(form.props().initialValues).toEqual({ weeks: 1 });
  });
});
