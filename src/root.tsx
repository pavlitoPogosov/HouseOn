import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router';

import { ApolloProvider } from '@apollo/client';

import { App } from './App';
import { appHistory } from './appHistory';
import { apolloClient, reduxStore } from './appStores';

ReactDOM.render(
  <Router history={appHistory}>
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={reduxStore}>
        <App />
      </ReduxProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
