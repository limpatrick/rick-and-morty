import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query Episodes {
        episodes {
          info {
            count
          }
          results {
            name
            episode
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

const App = () => (
  <>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Container maxWidth="sm">
        <Box textAlign="center">
          <Typography>App</Typography>
        </Box>
      </Container>
    </ApolloProvider>
  </>
);

export default App;
