import { addAlert } from 'actions/alerts';
import { setClientFollowUpDate } from 'actions/clients';
import { AlertLevel } from 'components/Alert/types';
import FollowUpForm from 'forms/FollowUpForm';
import { Box } from 'grid-styled';
import { findById, DateProvider, DefaultDateProvider } from 'helpers';
import React from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router-dom';
import { Client } from 'reducers/clients';
import { bindActionCreators } from 'redux';
import moment from 'moment';

interface Props {
  client?: Client;
  actions: any;
  dateProvider?: DateProvider;
  history: History;
}

interface State {
  saved: boolean;
}

export class FollowUp extends React.Component<Props, State> {
  state = {
    saved: false,
  };

  get dateProvider(): DateProvider {
    return this.props.dateProvider || new DefaultDateProvider();
  }

  get followUpDate(): moment.Moment | undefined {
    if (this.props.client && this.props.client.follow_up_date) {
      return moment.utc(this.props.client.follow_up_date);
    }
  }

  onSubmit = ({ weeks }) => {
    const date = this.dateProvider.today().add(parseInt(weeks), 'weeks');
    this.props.actions
      .setClientFollowUpDate(this.props.client, date)
      .then(() => {
        this.setState({ saved: true });
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
    const { saved } = this.state;
    if (!client) return null;

    return (
      <Box width={1} p={4}>
        <FollowUpForm
          onSubmit={this.onSubmit}
          saved={saved}
          followUpDate={this.followUpDate}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert, setClientFollowUpDate }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowUp);
