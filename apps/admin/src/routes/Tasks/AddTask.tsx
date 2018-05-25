import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import { blue, brown, green, grey, pink} from 'styles/colors';
import styled from 'styled-components';
import Filter from 'atoms/Filter';
import TaskTemplate from 'components/Tasks/TaskTemplate';

interface Props {
  className?: string;
}

const StyledLink = styled.span`
  a {
    color: ${grey};
    font-size: .8em;
    margin-left: 1em;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

class AddTask extends React.Component<Props, {}> {

  render () {
    return (
        <Box width={1}>
          <h2>Add New Task</h2>
          <Filter
            categories={[{name: 'debt', active: true}, {name: 'budget', active: false}]}
          />
          <Flex alignItems='center'>
            <h3>Task</h3> <StyledLink><Link  to='/'>Sort by last used</Link></StyledLink>
          </Flex>
          <TaskTemplate category='boop' description='This is a preexisting task.'></TaskTemplate>
        </Box>
    );
  }
}

export default AddTask;
