import { reduxStore } from 'appStores';

import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function createSetLocaleContext(store: typeof reduxStore): ApolloLink {
  return setContext(async (_, { headers }) => {
    // const { language } = store.getState().user;

    return {
      headers: {
        ...headers,
        'accept-language': 'en_US'
      }
    };
  });
}
