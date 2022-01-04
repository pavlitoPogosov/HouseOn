import { useState } from 'react';

import {
  ApolloError,
  QueryHookOptions,
  useQuery,
  DocumentNode,
  TypedDocumentNode,
  OperationVariables
} from '@apollo/client';

export const useQueryWithError = <R, V extends OperationVariables>(
  query: DocumentNode | TypedDocumentNode,
  options?: QueryHookOptions<R, V>
) => {
  const [error, setError] = useState<ApolloError | undefined>(undefined);

  const props = useQuery<R, V>(query, {
    ...options,
    onError: (e) => {
      if (options?.onError) {
        options.onError(e);
      }

      setError(e);
    }
  });

  return {
    ...props,
    error
  };
};
