import Panel from 'atoms/Panel';
import { Flex, Box } from 'grid-styled';
import React from 'react';
import { User, USER_TYPE } from 'reducers/auth';
import styled from 'styled-components';
import { grey, green } from 'styles/colors';
import { remCalc } from 'styles/type';
import {
  Dropdown,
  Props as DropdownProps,
} from 'components/Dropdowns/Dropdown';
import Label from 'atoms/Label';

interface Props {
  staffMember: User;
  className?: string;
  onUpdateRole(role: USER_TYPE, staffMember: User): void;
  onDelete(staffMember: User): void;
  onResend(staffMember: User): void;
}

class StaffListItem extends React.Component<Props> {
  get fullName() {
    const { staffMember } = this.props;
    return `${staffMember.first_name} ${staffMember.last_name}`;
  }

  render() {
    const { staffMember, onUpdateRole, onDelete, onResend } = this.props;
    return (
      <Panel shadow={true} className={this.props.className}>
        <Flex alignItems="center">
          <Box width={[3 / 5]}>
            {staffMember.type === USER_TYPE.PENDING_INVITE ? (
              <Email>{staffMember.email}</Email>
            ) : (
              <Name>{this.fullName}</Name>
            )}
          </Box>
          <Box width={[2 / 5]}>
            <Flex alignItems="center" justifyContent="space-between">
              <Box alignSelf="flex-start" width={[2 / 3]}>
                {staffMember.type === USER_TYPE.PENDING_INVITE ? (
                  <PendingInvite onResend={() => onResend(staffMember)} />
                ) : (
                  <RoleDropdown
                    type={staffMember.type}
                    onUpdateRole={role => onUpdateRole(role, staffMember)}
                  />
                )}
              </Box>
              <DeleteIcon
                onClick={() => onDelete(staffMember)}
                className="material-icons"
              >
                delete
              </DeleteIcon>
            </Flex>
          </Box>
        </Flex>
      </Panel>
    );
  }
}

const Name = styled.div`
  font-size: ${remCalc(28)};
  font-weight: bold;
`;

export const Email = styled.div`
  font-style: italic;
`;

const DeleteIcon = styled.i`
  cursor: pointer;
  color: ${grey};
`;

const Resend = styled.a`
  color: ${green};
  cursor: pointer;
  text-transform: uppercase;
`;

const StyledDropdown = styled<DropdownProps>(Dropdown)`
  color: ${green};
  cursor: pointer;
  position: absolute;
  text-transform: uppercase;
`;

interface RoleDropdownProps {
  type: USER_TYPE;
  onUpdateRole(role: USER_TYPE): void;
}

const RoleDropdown: React.SFC<RoleDropdownProps> = ({ type, onUpdateRole }) => {
  const userTypes = [USER_TYPE.COACH, USER_TYPE.CLIENT, USER_TYPE.ADMIN];
  return (
    <StyledDropdown title={type.toString()}>
      {userTypes.map((t, i) => {
        if (t !== type) {
          return (
            <div onClick={() => onUpdateRole(type)} key={i}>
              {t}
            </div>
          );
        }
      })}
    </StyledDropdown>
  );
};

interface PendingInviteProps {
  onResend(): void;
}

const PendingInvite: React.SFC<PendingInviteProps> = ({ onResend }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Label>Pending Invite</Label>
    <Resend onClick={() => onResend()}>Resend</Resend>
  </Flex>
);

export default StaffListItem;
