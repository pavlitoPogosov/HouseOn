import gql from 'graphql-tag';

export const FRAGMENT_DIRECTION = gql`
  fragment Direction on DirectionType {
    additional_info
    address
    geo_json
    house_id
    id
    latitude
    longitude
  }
`;
