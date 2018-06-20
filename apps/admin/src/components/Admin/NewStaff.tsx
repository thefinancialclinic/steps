import PageHeader from 'components/Headers/PageHeader';
import Button from 'atoms/Buttons/Button';

interface Props {}
const NewStaff: React.SFC<Props> = props => (
  <div>
    <PageHeader label="Staff">
      <Link to="/admin/staff/new">
        <Button>Invite Staff</Button>
      </Link>
    </PageHeader>
    <Label>Name & Email</Label>
    <StaffList staff={this.props.staff} />
  </div>
);
