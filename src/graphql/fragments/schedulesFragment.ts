import gql from 'graphql-tag';

export const FRAGMENT_SCHEDULES = gql`
  fragment Schedules on AccountType {
    amplua
    id
    name
    role
    schedules {
      end_time
      id
      start_time
      weekday
    }
  }
`;
