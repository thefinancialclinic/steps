import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getClients } from 'actions/clients';
import styled from 'styled-components';

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
        <h2>My Clients</h2>
        <Link to="/">Home</Link>
        <div className='clients'>
          {this.props.clients.map((client, key) => (
            <Link to={`/clients/${client.id}`} key={key}>{client.firstName} {client.lastName}</Link>
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
.clients {
  display: flex;
  flex-wrap: wrap;

  a {
    display: block;
    background: #fafafa;
    padding: 1em;
    margin: 0.5em;
  }
}
`;

export default connect(mapStateToProps, mapDispatchToProps)(StyledClients);
