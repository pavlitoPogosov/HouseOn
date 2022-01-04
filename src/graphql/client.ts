import { withScalars } from 'apollo-link-scalars';
import { buildClientSchema } from 'graphql';

import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  defaultDataIdFromObject,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';

import { reduxStore } from '../appStores';

import introspectionResult from './graphql.schema.json';
import { createCheckAuthenticationErrorLink } from './links/checkAuthenticationError';
import { createRetryOnNetworkErrorLink } from './links/retryOnNetworkError';
import { createSetAccessTokenContextLink } from './links/setAccessTokenContext';
import { createSetAccountIdContext } from './links/setAccountIdContext';
import { createSetLocaleContext } from './links/setLocaleContext';
import { createStringifyErrorMessagesLink } from './links/stringifyErrorMessages';
import { DateTimeScalar } from './scalars/DateTimeScalar';
import { TimeScalar } from './scalars/TimeScalar';

export interface ICreateApolloCacheProps {
  restoreCache?: NormalizedCacheObject;
}

export const createApolloCache = ({ restoreCache }: ICreateApolloCacheProps = {}): InMemoryCache => {
  const cache = new InMemoryCache({
    dataIdFromObject(value) {
      return defaultDataIdFromObject(value);
    }
  });

  if (restoreCache) {
    cache.restore(restoreCache);
  }

  return cache;
};

export interface ICreateApolloAuthLinkProps {
  reduxStore: typeof reduxStore;
}

export interface ICreateApolloClientProps {
  reduxStore: typeof reduxStore;
  uri: string;
}

export const createApolloClient = ({ reduxStore, uri }: ICreateApolloClientProps) => {
  const stringifyErrorMessages = createStringifyErrorMessagesLink();
  const setAccessTokenContext = createSetAccessTokenContextLink(reduxStore);
  const setAccountIdContext = createSetAccountIdContext(reduxStore);
  const setLocaleContext = createSetLocaleContext(reduxStore);
  const retryOnNetworkError = createRetryOnNetworkErrorLink();
  const checkAuthenticationError = createCheckAuthenticationErrorLink(reduxStore);

  const typesMap = {
    DateTime: DateTimeScalar,
    Time: TimeScalar
  };

  const schema = buildClientSchema(introspectionResult as any);
  const httpLink = ApolloLink.from([withScalars({ schema, typesMap }), createHttpLink({ uri })]);

  return new ApolloClient({
    cache: createApolloCache(),
    link: ApolloLink.from([
      stringifyErrorMessages,
      retryOnNetworkError,
      checkAuthenticationError,
      setAccessTokenContext,
      setLocaleContext,
      setAccountIdContext,
      httpLink
    ])
  });
};
