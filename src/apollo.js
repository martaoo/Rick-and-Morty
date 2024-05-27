// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

// Create an Apollo client
const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

provideApolloClient(apolloClient);

export { apolloClient };
