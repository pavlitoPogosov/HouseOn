import gql from 'graphql-tag';

export const FRAGMENT_PAGINATION_HEADER = gql`
  fragment PaginationHeader on PaginationHeaderType {
    hasNext
    onePage
    page
    totalCount
  }
`;
