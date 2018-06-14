import React from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import auth, { USER_TYPE, User } from 'reducers/auth';

import UserSwitcher from 'components/util/UserSwitcher';

import Admin from './Admin/index';
import Client from './Client/index';
import Coach from './Coach/index';
import Login from './Login';
import Superadmin from './Superadmin/index';

interface Props {
  children?: any;
  user: null | User;
  history: any;
}

const Layout: React.SFC = ({ history, user }: Props) => {
  const { type } = user;
  let Routes = DefaultRoutes;

  if (type === USER_TYPE.SUPER_ADMIN) Routes = Superadmin;
  else if (type === USER_TYPE.ADMIN) Routes = Admin;
  else if (type === USER_TYPE.COACH) Routes = Coach;
  else if (type === USER_TYPE.CLIENT) Routes = Client;

  return (
    <Wrapper>
      {process.env.NODE_ENV === 'development' && <UserSwitcher />}
      <Routes user={user} />
      {history.location !== '/' && <Redirect to={`/`} />}
    </Wrapper>
  );
};

const DefaultRoutes = props => <Login />;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(Layout));
