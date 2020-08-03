import "../styles/global.scss";

import { ApolloProvider } from "@apollo/react-hooks";
import { I18nProvider } from "@lingui/react";
import { AppProps } from "next/app";
import React, { FC } from "react";

import { useApollo } from "../graphql/setupApollo";
import { getLocale } from "../helpers/getLocale";
import * as catalogs from "../locales";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <I18nProvider language={getLocale()} catalogs={catalogs}>
        <Component {...pageProps} />
      </I18nProvider>
    </ApolloProvider>
  );
};

export default App;
