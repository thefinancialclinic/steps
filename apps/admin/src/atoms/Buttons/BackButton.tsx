import { Link } from 'react-router-dom';
import React from 'react';

interface Props {
  to: string;
}

const BackButton: React.SFC<Props> = ({ to }) => (
  <Link to={to}>&larr; Back</Link>
);

export default BackButton;
