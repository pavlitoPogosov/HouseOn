import gql from 'graphql-tag';

import { FRAGMENT_DIRECTION } from 'graphql/fragments/directionFragment';
import { FRAGMENT_INSTRUCTION } from 'graphql/fragments/instructionFragment';

export const FRAGMENT_HOUSE_CONTACT = gql`
  fragment HouseContact on ContactType {
    additional_info
    id
    phone
    title
  }
`;

export const FRAGMENT_HOUSE_STATUS = gql`
  fragment HouseStatus on HouseStatusType {
    created_at
    expires_at
    id
    text
    title
  }
`;

export const FRAGMENT_HOUSE_CHAT_DATA = gql`
  fragment HouseChatData on HouseType {
    id
    title
    image {
      id
      url
    }
    owner_account_id
  }
`;

export const FRAGMENT_HOUSE = gql`
  fragment House on HouseType {
    contacts {
      ...HouseContact
    }
    direction {
      ...Direction
    }
    instructions {
      ...Instruction
    }
    statuses {
      ...HouseStatus
    }
    comments
    count_events
    floor_space
    floor_space_unit
    id
    ownership_type
    title
    rent_expire_at
  }

  ${FRAGMENT_HOUSE_CONTACT}
  ${FRAGMENT_DIRECTION}
  ${FRAGMENT_INSTRUCTION}
  ${FRAGMENT_HOUSE_STATUS}
`;
