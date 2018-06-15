import UserSwitcher from 'components/util/UserSwitcher';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { User, USER_TYPE } from 'reducers/auth';
import styled from 'styled-components';
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

interface RoutesProps {
  children?: any;
  user?: User;
  history: any;
}

type RoutesElement = (props: RoutesProps) => JSX.Element;

const Routes: React.SFC = ({ history, user }: Props) => {
  const { type } = user;
  let Routes: RoutesElement = DefaultRoutes;

  if (type === USER_TYPE.SUPER_ADMIN) Routes = Superadmin;
  else if (type === USER_TYPE.ADMIN) Routes = Admin;
  else if (type === USER_TYPE.COACH) Routes = Coach;
  else if (type === USER_TYPE.CLIENT) Routes = Client;

  return (
    <Wrapper>
      {process.env.NODE_ENV === 'development' && <UserSwitcher />}
      <Routes user={user} history={history} />
    </Wrapper>
  );
};

const DefaultRoutes = ({ history }) =>
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