import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Panel from 'atoms/Panel';
import Button from 'atoms/Button';

interface Props {
  className?: string;
}

class Home extends React.Component<Props, {}> {
  render () {
    const { className } = this.props;

    return (
      <div className={className}>
        <div className='panel-wrapper'>
          <div className='blep'>
            <Panel fill>
              <Link to="/clients"><Button>My Clients</Button></Link>
            </Panel>
          </div>
          <div className='blep'>
            <Panel fill>
              <Link to="/clients/new"><Button>New Client</Button></Link>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

const StyledHome = styled(Home)`
  position: absolute;
  bottom: 0;
  top: 50px;
  left: 0;
  right: 0;

  .panel-wrapper {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;

    .blep {
      padding: 30px;
      text-align: center;
      width: 100%;

      &:hover {
        background-color: green;
      }
    }
  }
`;

export default StyledHome;
