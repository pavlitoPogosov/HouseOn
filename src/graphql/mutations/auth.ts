import { gql } from 'graphql-tag';

import { FRAGMENT_AUTH_RESPONSE } from 'graphql/fragments/authFragment';

export const MUTATION_USE_REFRESH_TOKEN = gql`
  mutation mutationUseRefreshToken($token: String!) {
    useRefreshToken(token: $token) {
      ...AuthResponseProps
    }
  }

  ${FRAGMENT_AUTH_RESPONSE}
`;

export const MUTATION_LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInWithEmail(email: $email, password: $password) {
      ...AuthResponseProps
    }
  }

  ${FRAGMENT_AUTH_RESPONSE}
`;

export const MUTATION_SIGNUP = gql`
  mutation SignUp($input: EmailSignupInput!) {
    signUpWithEmail(input: $input) {
      ...AuthResponseProps
    }
  }

  ${FRAGMENT_AUTH_RESPONSE}
`;

export const MUTATION_LOGOUT = gql`
  mutation mutationLogout($token: String!) {
    logout(token: $token)
  }
`;

export const MUTATION_START_SMS_AUTH_FLOW = gql`
  mutation mutationStartSmsAuthFlow($input: SmsAuthInput!) {
    startSmsAuthFlow(input: $input)
  }
`;

export const MUTATION_VERIFY_SMS_AUTH_CODE = gql`
  mutation mutationVerifySmsAuthCode($input: SmsAuthVerificationInput!) {
    result: verifySmsAuthCode(input: $input) {
      ...AuthResponseProps
    }
  }

  ${FRAGMENT_AUTH_RESPONSE}
`;

export const MUTATION_START_PASSWORD_RECOVER_FLOW = gql`
  mutation mutationStartPasswordRecoverFlow($email: String!) {
    result: startPasswordRecoverFlow(email: $email)
  }
`;

export const MUTATION_CHANGE_PASSWORD = gql`
  mutation mutationChangePassword($input: PasswordChangeInput!) {
    result: changePassword(input: $input) {
      ...AuthResponseProps
    }
  }

  ${FRAGMENT_AUTH_RESPONSE}
`;

export const MUTATION_RECOVER_PASSWORD = gql`
  mutation mutationRecoverPassword($input: PasswordRecoverInput!) {
    result: recoverPassword(input: $input) {
      ...AuthResponseProps
    }
  }

  ${FRAGMENT_AUTH_RESPONSE}
`;

export const MUTATION_START_PHONE_CHANGE_FLOW = gql`
  mutation mutationStartPhoneChangeFlow($input: SmsAuthInput!) {
    result: startPhoneChangeFlow(input: $input)
  }
`;

export const MUTATION_CHANGE_PHONE = gql`
  mutation mutationChangePhone($code: String!) {
    result: changePhone(code: $code)
  }
`;

export const MUTATION_START_EMAIL_CHANGE_FLOW = gql`
  mutation mutationStartEmailChangeFlow($input: EmailChangeInput!) {
    result: startEmailChangingFlow(input: $input)
  }
`;
