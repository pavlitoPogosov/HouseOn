import gql from 'graphql-tag';

import { FRAGMENT_INSTRUCTION } from 'graphql/fragments/instructionFragment';

export const MUTATION_CREATE_INSTRUCTION = gql`
  mutation CreateInstruction($input: InstructionCreateInput!) {
    result: createInstruction(input: $input) {
      ...Instruction
    }
  }

  ${FRAGMENT_INSTRUCTION}
`;

export const MUTATION_UPDATE_INSTRUCTION = gql`
  mutation UpdateInstruction($input: InstructionUpdateInput!) {
    result: updateInstruction(input: $input) {
      ...Instruction
    }
  }

  ${FRAGMENT_INSTRUCTION}
`;

export const MUTATION_DELETE_INSTRUCTION = gql`
  mutation DeleteInstruction($id: ID!) {
    result: deleteInstruction(id: $id)
  }
`;
