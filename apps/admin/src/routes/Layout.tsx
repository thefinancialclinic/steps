import React from 'react';
import styled from 'styled-components';
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import auth, { USER_TYPE } from 'reducers/auth';

import UserSwitcher from 'components/util/UserSwitcher';

import Admin from './Admin/';
import Client from './Client/';
import Coach from './Coach/';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Superadmin from './Superadmin/';

interface Props {
  children?: any;
  auth: any;
}

const Layout: React.SFC = ({ auth }: Props) => {
  const { type } = auth;
  let Routes = DefaultRoutes;

  if (type === USER_TYPE.SUPER_ADMIN) Routes = Superadmin;
  else if (type === USER_TYPE.ADMIN) Routes = Admin;
  else if (type === USER_TYPE.COACH) Routes = Coach;
  else if (type === USER_TYPE.CLIENT) Routes = Client;

  return (
    <Wrapper>
      {process.env.NODE_ENV === 'development' && <UserSwitcher />}
      <Routes auth={auth} />
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
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(Layout));
