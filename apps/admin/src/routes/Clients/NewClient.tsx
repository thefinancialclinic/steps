import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import Button from 'atoms/Button';
import StackedInputRow from 'components/Forms/StackedInputRow';
import Panel from 'atoms/Panel';

const Content = styled.div`
  position: relative;
  padding: 2em 2em 6em 2em;
  height: 100%;

  button {
    position: absolute;
    bottom:0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

class NewClient extends React.Component {
  render () {
    return (
      <div className='new-client'>
        <Flex flexWrap='wrap'>
          <Box width={[1, 1/2]} px={2}>
            <Content>
              <h2>Title</h2>
              <Box>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Box>
              <Button>Play Video</Button>
            </Content>
          </Box>
          <Box width={[1, 1/2]} px={2}>
            <Content>
              <h2>Add New Client</h2>
              <Flex flexWrap='wrap'>
                <Box width={[1, 1/2]} px={2}><StackedInputRow label='First' type='text' /></Box>
                <Box width={[1, 1/2]} px={2}><StackedInputRow label='Last' type='text' /></Box>
                <Box w={1} px={2}><StackedInputRow label='Email' type='email' /></Box>
                <Box px={2}><StackedInputRow label='Phone Number' type='tel' /></Box>
              </Flex>
              <Button>Save</Button>
            </Content>
          </Box>
        </Flex>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default NewClient;
