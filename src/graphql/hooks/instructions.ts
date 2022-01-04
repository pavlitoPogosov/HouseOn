import { useMutationWithError } from 'common/hooks/useMutationWithError';
import {
  MUTATION_CREATE_INSTRUCTION,
  MUTATION_DELETE_INSTRUCTION,
  MUTATION_UPDATE_INSTRUCTION
} from 'graphql/mutations/instructions';
import { InstructionCreateInput, InstructionType, InstructionUpdateInput, Scalars } from 'graphql/types';

export const useUpdateInstruction = () =>
  useMutationWithError<{ result: InstructionType }, { input: InstructionUpdateInput }>(MUTATION_UPDATE_INSTRUCTION);

export const useCreateInstruction = () =>
  useMutationWithError<{ result: InstructionType }, { input: InstructionCreateInput }>(MUTATION_CREATE_INSTRUCTION);

export const useDeleteInstruction = () =>
  useMutationWithError<{ result: boolean }, { id: Scalars['ID'] }>(MUTATION_DELETE_INSTRUCTION);
