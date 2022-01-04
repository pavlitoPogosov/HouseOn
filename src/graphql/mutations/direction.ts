import gql from 'graphql-tag';

import { FRAGMENT_DIRECTION } from 'graphql/fragments/directionFragment';

export const MUTATION_UPDATE_HOUSE_DIRECTION = gql`
  mutation UpdateHouseDirection($input: HouseDirectionInput!) {
    result: updateHouseDirection(input: $input) {
      ...Direction
    }
  }

  ${FRAGMENT_DIRECTION}
`;
