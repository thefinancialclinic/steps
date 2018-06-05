import React from 'react';
import styled from 'styled-components';
import Panel from 'atoms/Panel';
import { PendingInvite, User, Staff } from './types';

type Props = (PendingInvite | Staff<User>) & { className?: string };

class StaffListItem extends React.Component<Props, {}> {
  render() {
    return (
      <div className={this.props.className}>
        <Panel>
          <ListWrapper>
            <NameOrEmail {...this.props} />
            <div className="right">
              <Permissions {...this.props} />
            </div>
          </ListWrapper>
        </Panel>
      </div>
    );
  }
}

const NameOrEmail = props => {
  return props.pendingInvite ? (
    <Email>{this.props.email}</Email>
  ) : (
    <Name>{this.props.name}</Name>
  );
};

const Permissions = props => {
  return props.pendingInvite ? (
    <PermissionsDropdown>{props.permissions}</PermissionsDropdown>
  ) : (
    // TODO: Create clickable dropdown
    <PendingInvite>
      <span>Pending Invite</span>
      <span>Resend</span>
    </PendingInvite>
  );
};

const PermissionsDropdown = styled.div`
  text-transform: uppercase;
`;

const PendingInvite = styled.div`
  text-transform: uppercase;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div``;

const Email = styled.div`
  font-style: italic;
`;

const StyledStaffListItem = styled(StaffListItem)`
  margin-bottom: 10px;

  .right {
    display: flex;
    justify-content: flex-end;
  }
`;

export default StyledStaffListItem;
