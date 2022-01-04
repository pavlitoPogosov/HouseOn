import gql from 'graphql-tag';

import { FRAGMENT_HOUSE } from 'graphql/fragments/houseFragment';

import { FRAGMENT_USER } from './authFragment';

export const FRAGMENT_ACCOUNT = gql`
  fragment Account on AccountType {
    amplua
    created_at
    deactivated_at
    expires_at
    house_id
    id
    is_active
    is_pending_invite
    name
    role
    rewards {
      amount
      created_at
      creator {
        id
        name
      }
      creator_account_id
      currency
      id
      receiver {
        id
        name
      }
      receiver_account_id
    }
    invite {
      public_uuid
    }
    salary {
      amount
      currency
      duration
    }
    salary_id
    schedules {
      end_time
      start_time
      weekday
    }
    house {
      ...House
    }
    user {
      ...UserProps
    }
    user_id
  }

  ${FRAGMENT_HOUSE}
  ${FRAGMENT_USER}
`;

export const FRAGMENT_ACCOUNT_INVITE = gql`
  fragment AccountInvite on InviteType {
    account {
      ...Account
    }
    house {
      ...House
    }
    creator {
      ...UserProps
    }
    id
    public_uuid
  }

  ${FRAGMENT_ACCOUNT}
  ${FRAGMENT_USER}
  ${FRAGMENT_HOUSE}
`;

export const FRAGMENT_MODAL_ACCOUNT = gql`
  fragment Account on AccountType {
    name
    id
    is_pending_invite
    amplua
    expires_at
    role
    deactivated_at
    invite {
      public_uuid
    }
  }
`;

export const FRAGMENT_CHAT_ACCOUNT = gql`
  fragment Account on AccountType {
    name
    id
    role
  }
`;

export const FRAGMENT_REWARD = gql`
  fragment Reward on RewardType {
    amount
    created_at
    creator {
      ...Account
    }
    creator_account_id
    currency
    id
    receiver {
      ...Account
    }
    receiver_account_id
  }

  ${FRAGMENT_ACCOUNT}
`;
