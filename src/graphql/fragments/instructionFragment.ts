import gql from 'graphql-tag';

export const FRAGMENT_INSTRUCTION = gql`
  fragment Instruction on InstructionType {
    description
    id
    title
  }
`;
