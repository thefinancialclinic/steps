import { getClients, setClientFollowUpDate } from 'actions/clients';
import Main from 'atoms/Main';
import FollowUpForm from 'forms/FollowUpForm';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Client } from 'reducers/clients';
import { bindActionCreators } from 'redux';
import { History } from 'react-router-dom';
import { AlertLevel } from 'components/Alert/types';
import { addAlert } from 'actions/alerts';
import { findById } from 'helpers';

export interface DateProvider {
  today(): moment.Moment;
}

class DefaultDateProvider implements DateProvider {
  today(): moment.Moment {
    return moment.utc();
  }
}

interface Props {
  client?: Client;
  actions: any;
  dateProvider?: DateProvider;
  history: History;
}

export class FollowUp extends React.Component<Props> {
  get dateProvider(): DateProvider {
    return this.props.dateProvider || new DefaultDateProvider();
  }

  componentWillMount() {
    this.props.actions.getClients();
  }

  onSubmit = ({ weeks }) => {
    const date = this.dateProvider.today().add(parseInt(weeks), 'weeks');
    this.props.actions
      .setClientFollowUpDate(this.props.client, date)
      .then(() => {
        this.props.history.push(`/clients/${this.props.client.id}`);
        this.props.actions.addAlert({
          level: AlertLevel.Success,
          message: 'Success!',
          id: 'client-follow-up-success',
        });
      })
      .catch(err => {
        this.props.actions.addAlert({
          level: AlertLevel.Error,
          message: err.message,
          id: 'client-follow-up-error',
        });
      });
  };

  render() {
    const { client } = this.props;
    if (!client) return null;

    return (
      <Main>
        <FollowUpForm onSubmit={this.onSubmit} />
      </Main>
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { addAlert, getClients, setClientFollowUpDate },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowUp);
