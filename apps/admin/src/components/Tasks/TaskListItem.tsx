import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blue, green, lightGrey, white } from 'styles/colors';
import { remCalc, sansSerif } from 'styles/type';

const StyledLink = styled(Link)`
  color: ${green};
  font-size: 0.8em;
  margin-top: 0.5em;
  text-decoration: none;
  text-transform: uppercase;
`;

export default ({ setTaskStatus, task, url, index }) => {
  const toggleTaskStatus = e => {
    const status = task.status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED';
    setTaskStatus(task, status);
  };

  const checked =
    task.status === 'COMPLETED' ? 'check_circle' : 'check_circle_outline';

  return (
    <Background
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      p={20}
      width={1}
    >
      <Flex flexDirection="row" alignItems="center">
        <div onClick={toggleTaskStatus}>
          <i className={`material-icons ${checked}`}>{checked}</i>
        </div>
        <Title>{task.title}</Title>
      </Flex>
      <Box ml={34}>
        <StyledLink to={`${url}/${task.id}`}>View Steps &rarr;</StyledLink>
      </Box>
    </Background>
  );
};

const Background = styled(Flex)`
  background: ${white};
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;

  i.material-icons {
    cursor: pointer;
    width: 24px;
  }

  .check_circle {
    color: ${blue};
  }

  .check_circle_outline {
    color: ${lightGrey};
  }
`;

const Title = styled.h3`
  font-family: ${sansSerif};
  font-size: ${remCalc(24)};
  font-weight: 500;
  margin-top: 0;
  margin-left: 10px;
  margin-right: 0;
  margin-bottom: ${remCalc(10)};
`;
