import Header from 'atoms/Header';
import { Box } from 'grid-styled';
import { HTMLProps } from 'helpers/types';
import React from 'react';
import styled from 'styled-components';

interface Props extends HTMLProps {
  label: string;
}

const SectionHeader: React.SFC<Props> = ({ className, children, label }) => (
  <div className={className}>
    <h2>{label}</h2>
    {children}
  </div>
);

export default SectionHeader;
