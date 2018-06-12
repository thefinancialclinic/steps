import React from 'react';

import TermsModal from 'components/Clients/TermsModal';

interface Props {
  client: any;
}

class Terms extends React.Component<Props, {}> {
  render() {
    const { client } = this.props;
    const link = `/clients/${client.id}/tasks`;
    return <TermsModal phoneNumber="6365553226" link={link} />;
  }
}

export default Terms;
