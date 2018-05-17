import React from 'react';
import styled from 'styled-components';
import StaffListItem from './StaffListItem';

interface Props {
  className?: string;
}


class StaffList extends React.Component<Props, {}> {
  render () {
    return (
      <div className={this.props.className}>
        {Array.apply(null, Array(4)).map((_, i) => <StaffListItem key={i} />)}
      </div>
    );
  }
}

const StyledStaffList = styled(StaffList)`
`;

export default StyledStaffList;
