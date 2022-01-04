import gql from 'graphql-tag';

export const FRAGMENT_EVENT = gql`
  fragment Event on HouseEventType {
    id
    house_id
    title
    description
    starts_at
    ends_at
    uses_house_direction
    public_uuid
  }
`;

export const FRAGMENT_EVENT_CREATE_UPDATE = gql`
  fragment Event on HouseEventType {
    additional_info
    contacts {
      additional_info
      id
      phone
      title
    }
    creator_account_id
    description
    direction {
      additional_info
      address
      images {
        id
        url
      }
      latitude
      longitude
    }
    ends_at
    house_id
    creator {
      id
      name
      phone
    }
    id
    public_uuid
    starts_at
    title
    uses_house_direction
  }
`;

export const FRAGMENT_EVENT_SHORTENED = gql`
  fragment EventShortened on HouseEventType {
    id
    title
    creator {
      name
    }
    starts_at
    ends_at
  }
`;

export const FRAGMENT_EVENT_VIEW = gql`
  fragment EventView on HouseEventType {
    ...EventShortened
    public_uuid
  }

  ${FRAGMENT_EVENT_SHORTENED}
`;

export const FRAGMENT_EVENT_PUBLIC = gql`
  fragment Event on HouseEventPublicType {
    contacts {
      phone
      title
    }
    description
    creator_account_id
    direction {
      additional_info
      address
      latitude
      longitude
    }
    ends_at
    creator {
      email
      name
    }
    id
    starts_at
    title
  }
`;
