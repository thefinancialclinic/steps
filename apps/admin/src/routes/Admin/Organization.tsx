import OrganizationProfile from 'components/Admin/OrganizationProfile';
import { Box } from 'grid-styled';
import React from 'react';
import { Org } from 'reducers/auth';

interface Props {
  org: Org;
}

const Organization: React.SFC<Props> = ({ org }) => (
  <Box width={1} p={4}>
    <OrganizationProfile name={org.name} />
  </Box>
);

export default Organization;
