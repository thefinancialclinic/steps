import { Box, Flex } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';
import { blue, mediumBlue } from 'styles/colors';
import { remCalc } from 'styles/type';

interface Props {
  text: string;
}

const TaskStepNote: React.SFC<Props> = ({ text }) => {
  return (
    <StyledTaskStepNote>
      <i className="material-icons">flag</i>
      <p>text</p>
    </StyledTaskStepNote>
  );
};
const StyledTaskStepNote = styled.div`
  background-color: ${mediumBlue};
  box-shadow: 0 -${remCalc(2)} 0 1px ${mediumBlue};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding-bottom: ${remCalc(20)};
  padding-left: ${remCalc(20)};
  padding-right: ${remCalc(20)};
  padding-top: ${remCalc(18)};
  position: relative;
  z-index: 100;

  i {
    color: ${blue};
    margin-right: ${remCalc(10)};
  }

  p {
    margin: 0;
  }
`;

export default TaskStepNote;
