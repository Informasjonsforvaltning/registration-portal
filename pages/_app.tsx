import React, { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import env from "../env";

import TranslationsProvider from "../providers/translations";

import store from "../redux/store";
import { ThemeProvider } from "styled-components";
import {
  DefaultTheme,
} from "@fellesdatakatalog/theme";
import { AppProps } from "next/app";

import GlobalStyle from '../styles';

const { FDK_CMS_BASE_URI } = env;

const client = new ApolloClient({
  uri: `${FDK_CMS_BASE_URI}/graphql`,
  cache: new InMemoryCache(),
});



const App: FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <GlobalStyle />
        <ThemeProvider theme={DefaultTheme}>
          <TranslationsProvider>
            <ReduxProvider store={store}>
              <Component {...pageProps} />
            </ReduxProvider>
          </TranslationsProvider>
        </ThemeProvider>
      </CookiesProvider>
    </ApolloProvider>
  </SessionProvider>
);

export default App;
