import 'jest';
import { shallow } from 'enzyme';
import PhotoUpload from './PhotoUpload';
import React from 'react';
import DefaultPhoto from '../atoms/Photos/DefaultPhoto';
import ProfilePhoto from '../atoms/Photos/ProfilePhoto';

describe('PhotoUpload.tsx', () => {
  it('is defined', () => {
    const wrapper = shallow(<PhotoUpload />);

    expect(wrapper).toBeDefined();
  });

  it('it has a default photo if no photo url', () => {
    const wrapper = shallow(<PhotoUpload />);

    expect(wrapper.find(DefaultPhoto)).toHaveLength(1);
  });

  it('does not display default image if given a url', () => {
    const wrapper = shallow(<PhotoUpload imageUrl="myImage.jpeg" />);

    expect(wrapper.find(DefaultPhoto)).toHaveLength(0);
    expect(wrapper.find(ProfilePhoto)).toHaveLength(1);
  });
});
