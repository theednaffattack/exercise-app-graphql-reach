import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat, from } from "apollo-link";
// import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { onError } from "apollo-link-error";

const httpLink = new HttpLink({ uri: 'http://localhost:7008/graphql' });

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    }), httpLink]),
  cache: new InMemoryCache()
});

import App from './components/App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);