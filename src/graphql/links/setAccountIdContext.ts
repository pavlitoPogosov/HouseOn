import { reduxStore } from 'appStores';

import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function createSetAccountIdContext(store: typeof reduxStore): ApolloLink {
  return setContext(async (_, { headers }) => {
    const { currentAccountId } = store.getState().accounts;

    return {
      headers: {
        ...headers,
        'Account-Id': currentAccountId || ''
      }
    };
  });
}
