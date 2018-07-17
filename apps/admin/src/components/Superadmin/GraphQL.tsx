import React from 'react';
import GraphiQL from 'graphiql';
import api from 'api';

import styled from 'styled-components';
import 'graphiql/graphiql.css';

export const graphQLFetcher = graphQLParams => {
  return api
    .post('/postgraphile/graphql', graphQLParams, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.data)
    .catch(err => err.response.data);
};

const GraphQL: React.SFC<{}> = () => (
  <GraphiQLContainer>
    <GraphiQL fetcher={graphQLFetcher} />
  </GraphiQLContainer>
);

const GraphiQLContainer = styled.div`
  .graphiql-container {
    min-height: 800px;
  }
`;

export default GraphQL;
