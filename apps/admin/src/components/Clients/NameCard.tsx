import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import Panel from 'atoms/Panel';

import {
  blue,
  brown,
  green,
  grey,
  pink,
  yellow,
  white,
  colorFromString
} from 'styles/colors';

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

const badgeColors = [blue, brown, green, pink, yellow];

const BaseNameCard = styled.div`
  background-color: ${({ title }) => colorFromString(title.toUpperCase(), badgeColors)};
  border-radius: 4px;
  height: 180px;
  text-align: center;
  padding: 10px;

  .title {
    font-family: serif;
    font-size: 28px;
  }
`;

export default NameCard;
