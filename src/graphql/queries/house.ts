import gql from 'graphql-tag';

import {
  FRAGMENT_HOUSE,
  FRAGMENT_HOUSE_CONTACT,
  FRAGMENT_HOUSE_STATUS,
  FRAGMENT_HOUSE_CHAT_DATA
} from 'graphql/fragments/houseFragment';

export const QUERY_HOUSE = gql`
  query GetHouse {
    result: house {
      ...House
    }
  }

  ${FRAGMENT_HOUSE}
`;

export const QUERY_HOUSE_CONTACTS = gql`
  query GetHouseContacts {
    result: houseContacts {
      ...HouseContact
    }
  }

  ${FRAGMENT_HOUSE_CONTACT}
`;

export const QUERY_HOUSE_STATUSES = gql`
  query GetHouseStatuses {
    result: houseStatuses {
      ...HouseStatus
    }
  }

  ${FRAGMENT_HOUSE_STATUS}
`;

export const QUERY_HOUSE_CHAT_DATA = gql`
  query GetHouseChatData {
    result: house {
      ...HouseChatData
    }
  }

  ${FRAGMENT_HOUSE_CHAT_DATA}
`;
