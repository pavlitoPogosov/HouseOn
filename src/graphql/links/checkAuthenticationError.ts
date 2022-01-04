import { reduxStore } from 'appStores';

import { fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { refreshTokenAC } from 'redux/slices/authSlice/actionCreators';

export const createCheckAuthenticationErrorLink = (store: typeof reduxStore) =>
  onError(({ graphQLErrors, operation, forward }): any => {
    if (graphQLErrors && graphQLErrors.length > 0) {
      const errResponse = graphQLErrors[0]?.extensions?.response;

      if (errResponse && errResponse.error === 'Unauthorized' && errResponse.message === 'Invalid Token') {
        return fromPromise(store.dispatch(refreshTokenAC())).flatMap(() => forward(operation));
      }
    }
  });
