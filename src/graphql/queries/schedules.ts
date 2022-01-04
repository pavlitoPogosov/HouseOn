import gql from 'graphql-tag';

import { FRAGMENT_SCHEDULES } from '../fragments/schedulesFragment';

export const QUERY_SCHEDULES = gql`
  query GetSchedules($input: AccountFilterInput!) {
    result: houseAccounts(input: $input) {
      ...Schedules
    }
  }

  ${FRAGMENT_SCHEDULES}
`;
