import Button from 'atoms/Buttons/Button';
import Label from 'atoms/Label';
import Main from 'atoms/Main';
import PageHeader from 'components/Headers/PageHeader';
import StaffList from 'components/StaffList/StaffList';
import { StaffMember } from 'components/StaffList/types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import AdminNewStaff from '../../Admin/NewStaff';

interface Props {
  staff: StaffMember[];
}

export class Staff extends React.Component<Props, {}> {
  render() {
    return (
      <Main>
        <PageHeader label="Staff">
          <Link to="/admin/staff/new">
            <Button>Invite Staff</Button>
          </Link>
        </PageHeader>
        <Label>Name & Email</Label>
        <StaffList staff={this.props.staff} />
        <Switch>
          <Route path="/admin/staff/new" component={AdminNewStaff} />
        </Switch>
      </Main>
    );
  }
}

const mapStateToProps = ({ staff }) => ({
  staff,
});

export default connect(mapStateToProps)(Staff);
