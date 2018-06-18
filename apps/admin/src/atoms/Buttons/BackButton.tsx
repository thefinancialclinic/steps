import { Link } from 'react-router-dom';
import React from 'react';

import styled from 'styled-components';
import { green } from 'styles/colors';

interface Props {
  to: string;
  className?: string;
}

const BackButton: React.SFC<Props> = ({ to, className }) => (
  <Link className={className} to={to}>
    &larr; Back
  </Link>
);

const StyledBackButton = styled(BackButton)`
  text-transform: uppercase;
  text-decoration: none;
  color: ${green};
  &:visited,
  &:hover,
  &:active {
    color: ${green};
  }
`;

export default StyledBackButton;
