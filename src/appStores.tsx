import { apiGraphqlUrl } from 'config';

import { createApolloClient } from 'graphql/client';
import { setupReduxStore } from 'redux/store';

export const reduxStore = setupReduxStore();

export const apolloClient = createApolloClient({
  uri: apiGraphqlUrl,
  reduxStore
});
