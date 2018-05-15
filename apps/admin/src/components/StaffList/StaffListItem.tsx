import React from 'react';
import styled from 'styled-components';
import Panel from 'atoms/Panel';

interface Props {
  className?: string;
}


class StaffListItem extends React.Component<Props, {}> {
  render () {
    return (
      <div className={this.props.className}>
        <Panel>
          <div className='list-wrapper'>
            <div className='name-and-email'>bob@villa.com</div>
            <div className='right'>
              <div className='permissions'>dropdown here</div>
              <div className='actions'>icon</div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

const StyledStaffListItem = styled(StaffListItem)`
margin-bottom: 10px;

.list-wrapper {
  display: flex;
  justify-content: space-between;;
}

.right {
  display: flex;
  justify-content: flex-end;
}
`;

export default StyledStaffListItem;
