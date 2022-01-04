import gql from 'graphql-tag';

import {
  FRAGMENT_ACCOUNT_INVITE,
  FRAGMENT_ACCOUNT,
  FRAGMENT_MODAL_ACCOUNT,
  FRAGMENT_REWARD
} from 'graphql/fragments/accountsFragment';

export const MUTATION_CREATE_ACCOUNT_INVITE = gql`
  mutation mutationCreateAccountInvite($input: InviteToHouseCreateInput!) {
    result: createHouseInvite(input: $input) {
      ...AccountInvite
    }
  }

  ${FRAGMENT_ACCOUNT_INVITE}
`;

export const MUTATION_DEACTIVATE_ACCOUNT = gql`
  mutation mutationDeactivateAccount($id: ID!) {
    result: deactivateAccount(id: $id) {
      ...Account
    }
  }

  ${FRAGMENT_ACCOUNT}
`;

export const MUTATION_UPDATE_ACCOUNT = gql`
  mutation mutationUpdateAccount($input: AccountUpdateInput!) {
    result: updateAccount(input: $input) {
      ...Account
    }
  }

  ${FRAGMENT_ACCOUNT}
`;

export const MUTATION_UPDATE_MODAL_ACCOUNT = gql`
  mutation mutationUpdateAccount($input: AccountUpdateInput!) {
    result: updateAccount(input: $input) {
      ...Account
    }
  }

  ${FRAGMENT_MODAL_ACCOUNT}
`;

export const MUTATION_CREATE_REWARD = gql`
  mutation mutationCreateReward($input: RewardInput!) {
    result: createReward(input: $input) {
      ...Reward
    }
  }

  ${FRAGMENT_REWARD}
`;
