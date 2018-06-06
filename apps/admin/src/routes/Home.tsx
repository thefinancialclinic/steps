import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Panel from 'atoms/Panel';
import Button from 'atoms/Button';
import { svgBackgroundImage } from 'styles/';

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
      position: relative;
      text-align: center;
      width: 100%;

      > * {
        justify-content: center;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.8s;
      }

      &:hover::before {
        ${svgBackgroundImage('hover-bg.svg')}
        background-position: center;
        background-size: cover;
        opacity: 1;
      }
    }
  }
`;

export default StyledHome;
