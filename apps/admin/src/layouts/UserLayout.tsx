import { showModal } from 'actions/modals';
import EditButton from 'atoms/Buttons/EditButton';
import Sidebar from 'components/Sidebar/Sidebar';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EDIT_PROFILE } from 'routes/Coach/Clients/EditProfile';
import styled from 'styled-components';

interface Props {
  actions?: any;
  children?: any;
  user: any;
  links: any;
  role: any;
  routes: any;
  component: React.Component | React.SFC | any;
}

class UserLayout extends React.Component<Props, {}> {
  private static defaultProps = {
    withAddTask: false,
  };

  editClientProfile = () => {
    this.props.actions.showModal(EDIT_PROFILE);
  };

  render() {
    const { user, links, routes, component: Component, ...rest } = this.props;
    if (!user) return null;

    return (
      <StyledClient>
        <Flex>
          <Box width={[1, 1 / 3]}>
            <Sidebar links={links}>
              <EditButton onClick={this.editClientProfile} />
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
