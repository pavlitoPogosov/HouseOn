import gql from 'graphql-tag';

export const FRAGMENT_TEAM = gql`
  fragment Team on AccountType {
    amplua
    id
    is_active
    name
  }
`;
