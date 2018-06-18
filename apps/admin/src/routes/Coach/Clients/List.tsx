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
import { black } from 'styles/colors';

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

    const ClientsList =
      clients.length > 0 ? (
        clients.map((client, key) => (
          <Box key={key} width={[1, 1 / 3, 1 / 5]}>
            <StyledLink to={`/clients/${client.id}`}>
              <NameCard
                title={`${client.first_name} ${client.last_name}`}
                subtitle=""
              />
            </StyledLink>
          </Box>
        ))
      ) : (
        <Panel>
          Looks like you don’t have any clients using this program. At your next
          client session, invite them to join.
        </Panel>
      );

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
        <Flex className="clients" flexWrap="wrap">
          {ClientsList}
        </Flex>
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
