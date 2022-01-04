import gql from 'graphql-tag';

import { FRAGMENT_INVITE } from 'graphql/fragments/inviteFragment';

export const QUERY_INVITE = gql`
  query GetQueryInvite($public_uuid: String!) {
    result: invite(public_uuid: $public_uuid) {
      ...Invite
    }
  }

  ${FRAGMENT_INVITE}
`;
