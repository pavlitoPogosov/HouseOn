import gql from 'graphql-tag';

import { FRAGMENT_ACCOUNT } from 'graphql/fragments/accountsFragment';
import { FRAGMENT_HOUSE, FRAGMENT_HOUSE_CONTACT, FRAGMENT_HOUSE_STATUS } from 'graphql/fragments/houseFragment';

export const MUTATION_INITIALIZE_HOUSE = gql`
  mutation InitializeHouse($input: HouseInitializationInput!) {
    result: initializeHouse(input: $input) {
      account {
        ...Account
      }
      house {
        ...House
      }
    }
  }

  ${FRAGMENT_HOUSE}
  ${FRAGMENT_ACCOUNT}
`;

export const MUTATION_UPDATE_HOUSE_INSTRUCTIONS = gql`
  mutation UpdateHouseInstructions($input: HouseInstructionsUpdateInput!) {
    result: updateHouseInstructions(input: $input) {
      ...House
    }
  }

  ${FRAGMENT_HOUSE}
`;

export const MUTATION_UPDATE_HOUSE = gql`
  mutation UpdateHouse($input: HouseUpdateInput!) {
    result: updateHouse(input: $input) {
      ...House
    }
  }

  ${FRAGMENT_HOUSE}
`;

export const MUTATION_UPDATE_HOUSE_CONTACTS = gql`
  mutation UpdateHouseContacts($input: UpdateHouseContactsInput!) {
    result: updateHouseContacts(input: $input) {
      ...HouseContact
    }
  }

  ${FRAGMENT_HOUSE_CONTACT}
`;

export const MUTATION_DELETE_HOUSE_CONTACT = gql`
  mutation DeleteHouseContact($id: ID!) {
    result: deleteHouseContact(id: $id) {
      ...HouseStatus
    }
  }

  ${FRAGMENT_HOUSE_STATUS}
`;

export const MUTATION_CREATE_HOUSE_STATUS = gql`
  mutation CreateHouseStatus($input: HouseStatusCreateInput!) {
    result: createHouseStatus(input: $input) {
      ...HouseStatus
    }
  }

  ${FRAGMENT_HOUSE_STATUS}
`;

export const MUTATION_DELETE_HOUSE_STATUS = gql`
  mutation DeleteHouseStatus($id: ID!) {
    result: deleteHouseStatus(id: $id)
  }
`;

export const MUTATION_UPDATE_HOUSE_STATUS = gql`
  mutation UpdateHouseStatus($input: HouseStatusUpdateInput!) {
    result: updateHouseStatus(input: $input) {
      ...HouseStatus
    }
  }

  ${FRAGMENT_HOUSE_STATUS}
`;
