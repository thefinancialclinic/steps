import { Link } from 'react-router-dom';
import React from 'react';

import styled from 'styled-components';
import { green } from 'styles/colors';
import IconButton from './IconButton';

interface Props {
  to: string;
  className?: string;
  ml?: number | string;
}

const BackButton: React.SFC<Props> = ({ to, className, ml = '-17px' }) => (
  <Link className={className} to={to}>
    <IconButton iconName="arrow_back" ml={ml}>
      Back
    </IconButton>
  </Link>
);

const StyledBackButton = styled(BackButton)`
  display: block;
  text-decoration: none;

  div {
    color: ${green};
    &:visited,
    &:hover,
    &:active {
      color: ${green};
    }
  }
`;

export default StyledBackButton;
