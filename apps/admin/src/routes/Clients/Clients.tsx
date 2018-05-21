import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getClients } from 'actions/clients';
import styled from 'styled-components';

import ButtonLink from 'atoms/ButtonLink';
import NameCard from 'components/Clients/NameCard';

interface Props {
  className?: string;
  actions: any;
  clients: any[];
}

class Clients extends React.Component<Props, {}> {
  componentWillMount () {
    this.props.actions.getClients();
  }

  render() {
    return (
      <div className={this.props.className}>
        <Link to="/">&larr; Back</Link>
        <div className='header'>
          <h2>My Clients</h2>
          <ButtonLink to='/clients/new'>Add New Client</ButtonLink>
        </div>
        <div className='clients'>
          {this.props.clients.map((client, key) => (
            <Link to={`/clients/${client.id}`} key={key}><NameCard title={`${client.firstName} ${client.lastName}`} /></Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.clients.clients
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClients }, dispatch)
});

const StyledClients = styled(Clients)`
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.clients {
  display: flex;
  flex-wrap: wrap;

  a {
    display: block;
    background: #fafafa;
    margin: 0.5em;
  }
}
`;

export default connect(mapStateToProps, mapDispatchToProps)(StyledClients);
