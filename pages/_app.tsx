import type { AppProps } from 'next/app'
import './global.css'

import React, { FC } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import env from '../env';

import AuthProvider from '../providers/auth';
import TranslationsProvider from '../providers/translations';

import store from '../redux/store';

const { FDK_CMS_BASE_URI } = env;

const client = new ApolloClient({
  uri: `${FDK_CMS_BASE_URI}/graphql`,
  cache: new InMemoryCache()
});

console.log(process.env);


const App = ({ Component, pageProps }: AppProps) => (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <AuthProvider>
      hello worlds
          <TranslationsProvider>
            <ReduxProvider store={store}>
              <Component {...pageProps} />
            </ReduxProvider>
          </TranslationsProvider>
        </AuthProvider>
      </CookiesProvider>
    </ApolloProvider>
);

export default App;
