import React, { PropsWithChildren } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
});

export const GraphqlProvider = ({ children }: PropsWithChildren<{}>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
