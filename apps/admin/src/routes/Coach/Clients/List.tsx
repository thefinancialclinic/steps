import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex, Box } from 'grid-styled';
import { getClients } from 'actions/clients';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import NameCard from 'components/Clients/NameCard';
import Main from 'atoms/Main';
import PageHeader from 'components/Headers/PageHeader';
import BackButton from 'atoms/Buttons/BackButton';
import Button from 'atoms/Buttons/Button';
import { grey, black } from 'styles/colors';
import { sansSerif, remCalc } from 'styles/type';

interface Props {
  className?: string;
  actions: any;
  clients: any[];
}

class Clients extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getClients();
  }

  render() {
    const { clients, className } = this.props;

    let ClientsList;
    if (clients.length === 0) {
      ClientsList = (
        <Panel>
          Looks like you don’t have any clients using this program. At your next
          client session, invite them to join.
        </Panel>
      );
    } else {
      const ClientGroup = ({ collection, title }) => {
        if (collection.length === 0) return null;

        return (
          <Flex className="clients" flexDirection="column">
            <GroupTitle>
              {title} <span className="count">({collection.length})</span>
            </GroupTitle>
            <Flex flexDirection="row" flexWrap="wrap" mx="-10px">
              {collection.map((client, key) => (
                <Box key={key} width={[1, 1 / 3, 1 / 5]}>
                  <StyledLink to={`/clients/${client.id}`}>
                    <NameCard
                      title={`${client.first_name} ${client.last_name}`}
                      status={client.status}
                      subtitle=""
                    />
                  </StyledLink>
                </Box>
              ))}
            </Flex>
          </Flex>
        );
      };

      const clientsNeedingHelp = clients.filter(
        c => c.status === 'AWAITING_HELP',
      );
      const otherClients = clients.filter(c => c.status !== 'AWAITING_HELP');

      ClientsList = (
        <Box width={1}>
          <ClientGroup collection={clientsNeedingHelp} title="Awaiting Help" />
          <ClientGroup collection={otherClients} title="Everyone Else" />
        </Box>
      );
    }
    return (
      <Main className={className}>
        <BackButtonContainer>
          <BackButton to="/" />
        </BackButtonContainer>
        <PageHeader label="My Clients">
          <Link to="/clients/new">
            <Button>Add New Client</Button>
          </Link>
        </PageHeader>
        {ClientsList}
      </Main>
    );
  }
}

const BackButtonContainer = styled.div`
  margin-top: 1em;
`;

const StyledLink = styled(Link)`
  color: ${black};
  text-decoration: none;
  &:hover,
  &:active,
  &:visited {
    color: ${black};
  }
`;

const GroupTitle = styled.h4`
  font-family: ${sansSerif};
  font-size: ${remCalc(16)};
  font-weight: 500;
  margin-bottom: ${remCalc(10)};
  text-transform: uppercase;

  .count {
    color: ${grey};
  }
`;

const mapStateToProps = state => ({
  clients: state.clients.clients,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClients }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Clients);
