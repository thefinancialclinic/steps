import BackButton from 'atoms/Buttons/BackButton';
import Sidebar from 'components/Sidebar/Sidebar';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';

interface Props {
  actions?: any;
  children?: any;
  client: any;
  links: any;
  role: any;
  routes: any;
  user?: any;
  component: React.Component | React.SFC | any;
}

class Client extends React.Component<Props, {}> {
  private static defaultProps = {
    withAddTask: false,
  };

  render() {
    const { client, links, routes, component: Component, ...rest } = this.props;
    if (!client) return null;

    return (
      <StyledClient>
        <Flex>
          <Box width={[1, 1 / 3]}>
            <Sidebar links={links}>
              <BackButton to="/clients" />
              <h2>
                {client.first_name} {client.last_name}
              </h2>
            </Sidebar>
          </Box>
          <Box width={[1, 2 / 3]} m={4}>
            <Component client={client} {...rest} />
          </Box>
        </Flex>
      </StyledClient>
    );
  }
}
const StyledClient = styled.div``;

export default Client;
