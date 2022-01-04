import { useState } from 'react';

import { DocumentNode } from 'graphql';

import { ApolloError, MutationHookOptions, useMutation } from '@apollo/client';

export const useMutationWithError = <R, V>(mutation: DocumentNode, options?: MutationHookOptions<R, V>) => {
  const [error, setError] = useState<ApolloError | undefined>(undefined);

  const [callMutation, helpersObj] = useMutation<R, V>(mutation, {
    ...options,
    onError: (e) => {
      if (options?.onError) {
        options.onError(e);
      }

      setError(e);
    }
  });

  return [callMutation, { ...helpersObj, error }] as [typeof callMutation, typeof helpersObj];
};
