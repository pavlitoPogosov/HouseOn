import gql from 'graphql-tag';

import { FRAGMENT_ACCOUNT } from './accountsFragment';
import { FRAGMENT_USER } from './authFragment';
import { FRAGMENT_HOUSE } from './houseFragment';

export const FRAGMENT_INVITE = gql`
  fragment Invite on InviteType {
    account {
      ...Account
    }
    creator {
      ...UserProps
    }
    house {
      ...House
    }
    id
    public_uuid
  }

  ${FRAGMENT_ACCOUNT}
  ${FRAGMENT_USER}
  ${FRAGMENT_HOUSE}
`;
