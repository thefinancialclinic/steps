import React from 'react';
import styled from 'styled-components';
import { Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { User, USER_TYPE } from 'reducers/auth';

import Admin from './Admin/index';
import Client from './Client/index';
import Coach from './Coach/index';
import Login from './Login';
import Superadmin from './Superadmin/index';
import UserSwitcher from 'components/util/UserSwitcher';

interface Props {
  children?: any;
  user: null | User;
  history: any;
}

interface RoutesProps {
  children?: any;
  user?: User;
  history: any;
}

export type RoutesElement = (props: RoutesProps) => any;

const Routes: React.SFC<Props> = ({ history, user }) => {
  const { type } = user;
  let RoleRoutes: RoutesElement = DefaultRoutes;

  if (type === USER_TYPE.SUPER_ADMIN) RoleRoutes = Superadmin;
  else if (type === USER_TYPE.ADMIN) RoleRoutes = Admin;
  else if (type === USER_TYPE.COACH) RoleRoutes = Coach;
  else if (type === USER_TYPE.CLIENT) RoleRoutes = Client;

  return (
    <Wrapper>
      {process.env.NODE_ENV === 'development' && <UserSwitcher />}
      <RoleRoutes user={user} history={history} />
    </Wrapper>
  );
};

const DefaultRoutes: RoutesElement = ({ history }) =>
  history.location.pathname !== '/' ? <Redirect to="/" /> : <Login />;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(Routes));
