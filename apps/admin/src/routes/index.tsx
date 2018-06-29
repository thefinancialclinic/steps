import React from 'react';
import styled from 'styled-components';
import { Redirect, withRouter, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { User, USER_TYPE, Org } from 'reducers/auth';

import Admin from './Admin/index';
import Client from './Client/index';
import Coach from './Coach/index';
import Superadmin from './Superadmin/index';
import UserSwitcher from 'components/util/UserSwitcher';
import AuthRoutes from './Auth/index';
import Login from 'routes/Auth/Login';
import { getAuthenticatedUser, getOrg } from 'actions/auth';
import { bindActionCreators } from 'redux';

interface Props {
  children?: any;
  user: null | User;
  org?: Org;
  history: any;
  actions: { getAuthenticatedUser: Function; getOrg: Function };
  isAuthenticated: null | boolean;
}

export interface RoutesProps {
  children?: any;
  org?: Org;
  user?: User;
  history: any;
}

export type RoutesElement = (props: RoutesProps) => any;

class Routes extends React.Component<Props, {}> {
  componentDidMount() {
    const { actions, user } = this.props;
    process.env.AUTH0_ENABLED === 'true' &&
      actions.getAuthenticatedUser().then(() => {
        if (user.org_id) {
          actions.getOrg(user.org_id);
          console.log(this.props.org);
        }
      });
  }

  render() {
    const { history, user, isAuthenticated, org } = this.props;
    const { type } = user;
    let RoleRoutes: RoutesElement = DefaultRoutes;

    if (type === USER_TYPE.SUPER_ADMIN) RoleRoutes = Superadmin;
    else if (type === USER_TYPE.ADMIN) RoleRoutes = Admin;
    else if (type === USER_TYPE.COACH) RoleRoutes = Coach;
    else if (type === USER_TYPE.CLIENT) RoleRoutes = Client;

    if (isAuthenticated === null) {
      return null;
    } else {
      return (
        <Wrapper>
          {process.env.NODE_ENV === 'development' && <UserSwitcher />}
          <Switch>
            <AuthRoutes user={user} org={org} history={history}>
              <RoleRoutes user={user} org={org} history={history} />
            </AuthRoutes>
          </Switch>
        </Wrapper>
      );
    }
  }
}

const DefaultRoutes: RoutesElement = ({ history }) =>
  history.location.pathname !== '/' ? <Redirect to="/" /> : <Login />;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const mapStateToProps = state => ({
  user: state.auth.user,
  org: state.auth.org,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAuthenticatedUser, getOrg }, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Routes),
);
