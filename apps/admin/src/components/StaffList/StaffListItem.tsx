import React from 'react';
import styled from 'styled-components';
import Panel from 'atoms/Panel';
import { PendingInvite, User, Staff, StaffMember } from './types';
import { Flex, Box } from 'grid-styled';

type Props = StaffMember & { className?: string };

class StaffListItem extends React.Component<Props, {}> {
  render() {
    return (
      <Panel shadow={true} className={this.props.className}>
        <Flex justifyContent="space-between">
          <Box>
            <NameOrEmail {...this.props} />
          </Box>
          <Box>
            <PendingInvite>Pending Invite</PendingInvite>
          </Box>
        </Flex>
      </Panel>
    );
  }
}

export const NameOrEmail = props => {
  const { email, name, pendingInvite } = props;
  return pendingInvite ? <Email>{email}</Email> : <Name>{name}</Name>;
};

const PendingInvite = styled.div`
  text-transform: uppercase;
`;

const Name = styled.div``;

export const Email = styled.div`
  font-style: italic;
`;

export default StaffListItem;
