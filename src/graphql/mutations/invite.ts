import gql from 'graphql-tag';

import { FRAGMENT_ACCOUNT } from 'graphql/fragments/accountsFragment';

export const MUTATION_ACCEPT_INVITE = gql`
  mutation AcceptInvite($public_uuid: String!) {
    result: acceptHouseInvite(public_uuid: $public_uuid) {
      ...Account
    }
  }

  ${FRAGMENT_ACCOUNT}
`;
