import { reduxStore } from 'appStores';

import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function createSetAccessTokenContextLink(store: typeof reduxStore): ApolloLink {
  return setContext(async (_, { headers }) => {
    const accessToken = store.getState().auth?.authData?.accessToken;

    return {
      headers: {
        ...headers,
        authorization: 'Bearer ' + (accessToken || '')
      }
    };
  });
}
