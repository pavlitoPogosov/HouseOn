import { gql } from 'graphql-tag';

export const FRAGMENT_USER = gql`
  fragment UserProps on UserType {
    email
    email_verified
    id
    name
    phone
    date_of_birth
  }
`;

export const FRAGMENT_REFRESH_TOKEN = gql`
  fragment RefreshTokenProps on UserAuthTokenType {
    id
    expires_at
    token
    type
  }
`;

export const FRAGMENT_AUTH_RESPONSE = gql`
  fragment AuthResponseProps on AuthResponseType {
    accessToken
    refreshToken {
      ...RefreshTokenProps
    }
    user {
      ...UserProps
    }
  }

  ${FRAGMENT_REFRESH_TOKEN}
  ${FRAGMENT_USER}
`;
