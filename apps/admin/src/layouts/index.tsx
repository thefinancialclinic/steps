import React from 'react';
import UserLayout from './UserLayout';

export const composeLayout = Layout => (Component, props) => matchProps => (
  <Layout {...matchProps} {...props} component={Component} />
);

export const composeUserLayout = composeLayout(UserLayout);
