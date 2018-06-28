import React from 'react';
import styled from 'styled-components';
import { grey, mediumBlue } from 'styles/colors';
import Badge from '../atoms/Badge';

export interface FilterCategory {
  name: string;
  active: boolean;
  color?: string;
}

interface Props {
  categories: FilterCategory[];
  update: (category: FilterCategory, event: MouseEvent) => void;
}

const compose = (category, fn) => event => {
  return fn(category, event);
};

const Filter: React.SFC<Props> = ({ categories, children, update }) => (
  <BaseFilter>
    <span>Filter</span>
    {categories.map((cat, key) => (
      <Badge
        text={cat.name}
        key={key}
        color={!cat.active ? grey : cat.color}
        onClick={compose(
          cat,
          update,
        )}
      />
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
