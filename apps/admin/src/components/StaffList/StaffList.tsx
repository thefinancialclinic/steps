import { Box, Flex } from 'grid-styled';
import React from 'react';
import StaffListItem from './StaffListItem';
import { User, USER_TYPE } from 'reducers/auth';
import Label from 'atoms/Label';

interface Props {
  className?: string;
  staff: User[];
  onDelete(staffMember: User): void;
  onUpdateRole(role: USER_TYPE, staffMember: User): void;
  onResend(staffMember: User): void;
}

class StaffList extends React.Component<Props> {
  render() {
    const { onDelete, onUpdateRole, onResend } = this.props;
    return (
      <div>
        <Flex>
          <Box mb={2} width={[3 / 5]}>
            <Label>Name & Email</Label>
          </Box>
          <Box mb={2} width={[2 / 5]}>
            <Label>Permissions</Label>
          </Box>
        </Flex>
        <Flex flexDirection="column" className={this.props.className}>
          {this.props.staff.map((staffMember, i) => {
            return (
              <Box mb={2} key={i}>
                <StaffListItem
                  staffMember={staffMember}
                  onDelete={onDelete}
                  onUpdateRole={onUpdateRole}
                  onResend={onResend}
                />
              </Box>
            );
          })}
        </Flex>
      </div>
    );
  }
}

export default StaffList;
