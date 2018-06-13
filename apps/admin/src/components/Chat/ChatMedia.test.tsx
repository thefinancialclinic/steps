import React from 'react';
import 'jest';
import { shallow } from 'enzyme';

import ChatMedia from './ChatMedia';

it('displays URL domain', () => {
  const chatMedia = shallow(
    <ChatMedia
      title="Tres & Tanya's Story"
      url="https://example.com/some/path"
    />,
  );
  expect(chatMedia.find('.domain').text()).toBe('example.com');
});

it('displays title', () => {
  const chatMedia = shallow(
    <ChatMedia
      title="Tres & Tanya's Story"
      url="https://example.com/some/path"
    />,
  );
  expect(chatMedia.find('.title').text()).toBe("Tres & Tanya's Story");
});

it('hides media when title is missing', () => {
  const chatMedia = shallow(<ChatMedia url="https://example.com/some/path" />);
  expect(chatMedia.find('.media').exists()).toBe(false);
});

it('links to URL', () => {
  const url = 'https://example.com/some/path';
  const chatMedia = shallow(
    <ChatMedia title="Tres & Tanya's Story" url={url} />,
  );
  expect(chatMedia.find('a').prop('href')).toBe(url);
});
