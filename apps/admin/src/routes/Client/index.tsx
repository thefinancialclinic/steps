import TopBar from 'components/TopBar';
import Alert from 'containers/Alert';
import { composeUserLayout } from 'layouts';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RoutesElement } from '..';
import TasksList from './TasksList';
import TaskShow from './TaskShow';
import GoalList from './GoalList';

const Client: RoutesElement = ({ user }) => {
  if (!user) return null;

  const links = [
    { text: 'Tasks', to: '/tasks' },
    { text: 'Goals', to: '/goals' },
  ];

  const composeLayout = Component =>
    composeUserLayout(Component, { links, user, role: user.type });

  return (
    <div>
      <TopBar user={user} />
      <Alert />
      <Switch>
        <Route path="/tasks/:id" render={composeLayout(TaskShow)} />
        <Route path="/tasks" render={composeLayout(TasksList)} />
        <Route path="/goals" render={composeLayout(GoalList)} />
        <Route exact path="/" render={_props => <Redirect to="/tasks" />} />
      </Switch>
    </div>
  );
};

export default Client;
