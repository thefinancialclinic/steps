import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex, Box } from 'grid-styled';
import { getClients } from 'actions/clients';
import styled from 'styled-components';

import ButtonLink from 'atoms/ButtonLink';
import Panel from 'atoms/Panel';
import NameCard from 'components/Clients/NameCard';

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
      <div className={this.props.className}>
        <Box width={1}>
          <Link to="/">&larr; Back</Link>
        </Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <h2>My Clients</h2>
          </Box>
          <Box>
            <ButtonLink to="/clients/new">Add New Client</ButtonLink>
          </Box>
        </Flex>
        <Flex className="clients" flexWrap="wrap">
          {ClientsList}
        </Flex>
      </div>
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
