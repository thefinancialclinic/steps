import React from 'react';
import styled from 'styled-components';
import Panel from 'atoms/Panel';

import {
  blue,
  brown,
  green,
  pink,
  red,
  yellow,
  colorFromString,
} from 'styles/colors';

import { UserStatus } from 'reducers/clients';

interface Props {
  title: string;
  status: UserStatus;
  subtitle?: string;
}

class NameCard extends React.Component<Props, {}> {
  render() {
    return (
      <BaseNameCard
        {...this.props}
        className={this.props.status === 'AWAITING_HELP' && 'needs-help'}
      >
        <Panel shadow fill>
          <h3 className="title">{this.props.title}</h3>
        </Panel>
      </BaseNameCard>
    );
  }
}

const badgeColors = [blue, brown, green, pink, yellow];

const BaseNameCard = styled.div`
  background-color: ${({ title }) =>
    colorFromString(title.toUpperCase(), badgeColors)};
  border-radius: 4px;
  height: 180px;
  text-align: center;
  padding: 10px;
  position: relative;
  margin: 8px;

  &.needs-help::before {
    background: ${red};
    border-radius: 100px;
    content: '';
    height: 12px;
    left: 25px;
    position: absolute;
    top: 25px;
    width: 12px;
  }

  .title {
    font-family: serif;
    font-size: 28px;
  }
`;

export default NameCard;
