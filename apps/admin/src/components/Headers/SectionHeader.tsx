import Header from 'atoms/Header';
import { Box } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
}

const SectionHeader: React.SFC<Props> = ({ children, label }) => (
  <div>
    <h2>{label}</h2>
    {children}
  </div>
);

export default SectionHeader;
