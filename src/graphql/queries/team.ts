import gql from 'graphql-tag';

import { FRAGMENT_TEAM } from '../fragments/teamFragment';

export const QUERY_TEAM = gql`
  query GetTeam($input: AccountFilterInput!) {
    result: houseAccounts(input: $input) {
      ...Team
    }
  }

  ${FRAGMENT_TEAM}
`;
