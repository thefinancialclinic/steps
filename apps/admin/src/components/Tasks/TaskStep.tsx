import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { green, white } from 'styles/colors';
import Input from 'atoms/Input';
import Button from 'atoms/Button'
import Panel from 'atoms/Panel';
import StackedInputRow from 'components/Forms/StackedInputRow';

interface Props {
  className?: string;
  count: number;
}

class TaskStep extends React.Component<Props, {}> {

  render() {
    const { className, count } = this.props;

    return (
      <Flex className={className}>
        <Box width={1/8} >
          <Flex className='step-actions'>
            <Box width={1} mb={1}>
              <div className='circle'>{count}</div>
            </Box>
            <Box width={1} mt={1}>X</Box>
          </Flex>
        </Box>
        <Box width={7/8}>
          <Input type='text' />
        </Box>
      </Flex>
    );
  }
}

const StyledTaskStep = styled(TaskStep)`
  padding: 1em;

  .step-actions {
    align-items: center;
    flex-direction: column;
    height: 100%;

    > div {
      flex: 1;
    }
  }
  .circle {
    background-color: ${green};
    border-radius: 50%;
    color: ${white};
    display: table-cell;
    height: 24px;
    text-align: center;
    vertical-align: middle;
    width: 24px;
  }
`;

export default StyledTaskStep;
