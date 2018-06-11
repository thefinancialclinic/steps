import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Badge from './Badge';
import { grey, mediumBlue } from 'styles/colors';

interface FilterCategory {
  name: string;
  active: boolean;
  color?: string;
}

interface Props {
  categories: FilterCategory[];
}

const Filter: React.SFC<Props> = ({ categories, children }) => (
  <BaseFilter>
    <span>Filter</span>
    {categories.map((cat, key) => (
      <Badge text={cat.name} key={key} color={!cat.active ? grey : cat.color} />
    ))}
  </BaseFilter>
);

const BaseFilter = styled.div`
  align-items: center;
  border-bottom: 1px solid ${mediumBlue};
  border-top: 1px solid ${mediumBlue};
  color: ${grey};
  display: flex;
  font-size: 0.825rem;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
  text-transform: uppercase;

  > * {
    margin-right: 0.5em;
  }
`;

export default Filter;
