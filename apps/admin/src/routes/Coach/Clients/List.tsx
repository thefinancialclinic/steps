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
import Button from 'atoms/Buttons/Button';

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
    const { clients } = this.props;

    const ClientsList =
      clients.length > 0 ? (
        clients.map((client, key) => (
          <Box key={key} width={[1, 1 / 3, 1 / 5]}>
            <Link to={`/clients/${client.id}`}>
              <NameCard
                title={`${client.first_name} ${client.last_name}`}
                subtitle=""
              />
            </Link>
          </Box>
        ))
      ) : (
        <Panel>
          Looks like you don’t have any clients using this program. At your next
          client session, invite them to join.
        </Panel>
      );

    return (
      <Main>
        <Box width={1}>
          <Link to="/">&larr; Back</Link>
        </Box>
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

const mapStateToProps = state => ({
  clients: state.clients.clients,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClients }, dispatch),
});

const StyledClients = styled(Clients)``;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledClients);
