import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import Pages from '../pages';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => (
  <>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
  </>
);

export default App;
