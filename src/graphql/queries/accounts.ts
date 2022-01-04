import gql from 'graphql-tag';

import { FRAGMENT_ACCOUNT, FRAGMENT_CHAT_ACCOUNT, FRAGMENT_MODAL_ACCOUNT } from 'graphql/fragments/accountsFragment';

import { FRAGMENT_USER } from '../fragments/authFragment';

export const QUERY_ACCOUNT_BY_ID = gql`
  query GetAccountById($id: ID!) {
    result: accountById(id: $id) {
      ...Account
    }
  }

  ${FRAGMENT_ACCOUNT}
`;

export const QUERY_AVAILABLE_ACCOUNTS = gql`
  query GetAvailableAccounts {
    result: availableAccounts {
      ...Account
    }
  }

  ${FRAGMENT_ACCOUNT}
`;

export const QUERY_ACCOUNTS = gql`
  query GetAccounts($input: AccountFilterInput!) {
    result: houseAccounts(input: $input) {
      ...Account
    }
  }

  ${FRAGMENT_ACCOUNT}
`;

export const QUERY_MODAL_ACCOUNTS = gql`
  query GetModalAccounts($input: AccountFilterInput!) {
    result: houseAccounts(input: $input) {
      ...Account
    }
  }

  ${FRAGMENT_MODAL_ACCOUNT}
`;

export const QUERY_CHAT_ACCOUNTS = gql`
  query GetModalAccounts($input: AccountFilterInput!) {
    result: houseAccounts(input: $input) {
      ...Account
    }
  }

  ${FRAGMENT_CHAT_ACCOUNT}
`;

export const QUERY_USER = gql`
  query GetUser($id: ID!) {
    result: user(id: $id) {
      ...UserProps
    }
  }

  ${FRAGMENT_USER}
`;

export const QUERY_ACCOUNTS_COUNT = gql`
  query GetAccountsCount($input: AccountFilterInput) {
    result: houseAccounts(input: $input) {
      id
      role
    }
  }
`;
