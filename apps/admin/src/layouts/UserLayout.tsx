import { showModal } from 'actions/modals';
import EditButton from 'atoms/Buttons/EditButton';
import Sidebar from 'components/Sidebar/Sidebar';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EDIT_PROFILE } from 'routes/Coach/Clients/EditProfile';
import styled from 'styled-components';
import { textAlign } from 'styled-system';
import { USER_TYPE, User } from '../reducers/auth';
import Flex100 from 'atoms/Flex100';

interface Props {
  actions?: { showModal };
  children?: any;
  user: User;
  links: any;
  role: any;
  routes: any;
  component: React.Component | React.SFC | any;
}

class UserLayout extends React.Component<Props, {}> {
  editClientProfile = () => {
    this.props.actions.showModal(EDIT_PROFILE);
  };

  render() {
    const {
      user,
      role,
      links,
      routes,
      component: Component,
      authUser,
      ...rest
    } = this.props;
    if (!user) return null;

    const name = authUser.type === 'Client' 
    ? `${user.first_name} ${user.last_name.substr(0, 1)}.`
    : `${user.first_name} ${user.last_name}`;

    return (
      <Flex100>
        <Flex100 flexWrap={['wrap', 'nowrap', 'nowrap']}>
          <Box width={[1, 1, 1 / 3, 1 / 5]}>
            <Sidebar links={links}>
              {role !== USER_TYPE.CLIENT && (
                <EditButton onClick={this.editClientProfile} />
              )}
              <H2 textAlign={['center', 'left']}>
                {name}
              </H2>
            </Sidebar>
          </Box>
          <Box width={[1, 1, 2 / 3, 4 / 5]} m={4} className="content">
            <Component user={user} {...rest} />
          </Box>
        </Flex100>
      </Flex100>
    );
  }
}

const H2 = styled.h2`
  ${textAlign};
`;

const mapStatetoProps = ({ auth }) => ({
    authUser: auth.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ showModal }, dispatch),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(UserLayout);
