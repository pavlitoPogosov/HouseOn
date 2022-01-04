import gql from 'graphql-tag';

import { FRAGMENT_EVENT_SHORTENED, FRAGMENT_EVENT_VIEW } from 'graphql/fragments/eventsFragment';
import { FRAGMENT_PAGINATION_HEADER } from 'graphql/fragments/paginationFragment';

export const QUERY_HOUSE_EVENTS_PAGE = gql`
  query GetHouseEvents($input: HouseEventPageInput) {
    result: houseEventsPage(input: $input) {
      header {
        ...PaginationHeader
      }
      list {
        ...EventShortened
      }
    }
  }

  ${FRAGMENT_PAGINATION_HEADER}
  ${FRAGMENT_EVENT_SHORTENED}
`;

export const QUERY_EVENTS_VIEW = gql`
  query GetHouseEvents($input: HouseEventPageInput) {
    result: houseEventsPage(input: $input) {
      header {
        ...PaginationHeader
      }
      list {
        ...EventView
      }
    }
  }

  ${FRAGMENT_PAGINATION_HEADER}
  ${FRAGMENT_EVENT_VIEW}
`;
