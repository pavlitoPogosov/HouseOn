import gql from 'graphql-tag';

import { FRAGMENT_EVENT, FRAGMENT_EVENT_CREATE_UPDATE, FRAGMENT_EVENT_PUBLIC } from 'graphql/fragments/eventsFragment';

export const MUTATION_CREATE_HOUSE_EVENT = gql`
  mutation CreateHouseEvent($input: HouseEventCreateInput!) {
    result: createHouseEvent(input: $input) {
      ...Event
      creator {
        id
        name
        phone
      }
    }
  }

  ${FRAGMENT_EVENT}
`;

export const MUTATION_UPDATE_HOUSE_EVENT = gql`
  mutation ($input: HouseEventUpdateInput!) {
    result: updateHouseEvent(input: $input) {
      ...Event
      creator {
        id
        name
        phone
      }
    }
  }

  ${FRAGMENT_EVENT}
`;

export const QUERY_EVENT_BY_ID = gql`
  query GetEventById($id: ID!) {
    result: event(id: $id) {
      ...Event
    }
  }

  ${FRAGMENT_EVENT_CREATE_UPDATE}
`;

export const QUERY_PUBLIC_EVENT_BY_ID = gql`
  query GetPublicEventById($id: String!) {
    result: houseEventPublic(public_uuid: $id) {
      ...Event
    }
  }

  ${FRAGMENT_EVENT_PUBLIC}
`;

export const MUTATION_DELETE_HOUSE_EVENT = gql`
  mutation DeleteHouseEvent($id: ID!) {
    result: deleteHouseEvent(id: $id)
  }
`;
