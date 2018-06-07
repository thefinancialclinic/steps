import React from 'react';
import styled from 'styled-components';
import StaffListItem from './StaffListItem';
import { StaffMember } from './types';
import { Flex, Box } from 'grid-styled';

interface Props {
  className?: string;
  staff: StaffMember[];
}

class StaffList extends React.Component<Props, {}> {
  render() {
    return (
      <Flex flexDirection="column" className={this.props.className}>
        {this.props.staff.map((staffMember, i) => {
          return (
            <Box key={i}>
              <StaffListItem {...staffMember} />
            </Box>
          );
        })}
      </Flex>
    );
  }
}

const StyledStaffList = styled.div``;

export default StaffList;
