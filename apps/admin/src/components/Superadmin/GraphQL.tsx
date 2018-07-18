import React from 'react';
import GraphiQL from 'graphiql';
import api from 'api';

import styled from 'styled-components';
import 'graphiql/graphiql.css';

const defaultQuery = `# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that starts
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)

{ allOrgs { nodes { id, name }}}
`;

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
    <GraphiQL fetcher={graphQLFetcher} query={defaultQuery} />
  </GraphiQLContainer>
);

const GraphiQLContainer = styled.div`
  .graphiql-container {
    min-height: 800px;
  }
`;

export default GraphQL;
