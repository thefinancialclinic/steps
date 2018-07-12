import { showModal } from 'actions/modals';
import EditButton from 'atoms/Buttons/EditButton';
import Sidebar from 'components/Sidebar/Sidebar';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EDIT_PROFILE } from 'routes/Coach/Clients/EditProfile';
import styled from 'styled-components';
import { USER_TYPE, User } from '../reducers/auth';
import { Z_ERRNO } from 'zlib';

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
  componentDidMount() {
    // Zendesk chat widget should not be shown if
    // user is a client. widget is loaded in (root)/index.tsx.
    if (this.props.user.type === 'Client') zE.hide();
  }
  
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
      ...rest
    } = this.props;
    if (!user) return null;

    return (
      <StyledClient>
        <Flex>
          <Box width={[1, 1 / 3]}>
            <Sidebar links={links}>
              {role !== USER_TYPE.CLIENT && (
                <EditButton onClick={this.editClientProfile} />
              )}
              <h2>
                {user.first_name} {user.last_name}
              </h2>
            </Sidebar>
          </Box>
          <Box width={[1, 2 / 3]} m={4} className="content">
            <Component user={user} {...rest} />
          </Box>
        </Flex>
      </StyledClient>
    );
  }
}
const StyledClient = styled.div``;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ showModal }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(UserLayout);
