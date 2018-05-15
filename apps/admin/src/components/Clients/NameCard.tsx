import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import Panel from 'atoms/Panel';

interface Props {
  title: string;
  subtitle?: string;
}

class NameCard extends React.Component<Props, {}> {
  render () {
    return (
      <BaseNameCard {...this.props}>
        <Panel shadow fill>
          <h3 className='title'>{this.props.title}</h3>
        </Panel>
      </BaseNameCard>
    );
  }
}

const BaseNameCard = styled.div`
  background-color: red;
  border-radius: 4px;
  height: 180px;
  text-align: center;
  width: 303px;
  padding: 10px;

  .title {
    font-family: serif;
    font-size: 28px;
  }
`;

export default NameCard;
