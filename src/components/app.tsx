import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Pages from '../pages';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6FBC67',
    },
    secondary: {
      main: '#04ADC1',
    },
  },
});

const App = () => (
  <>
    <CssBaseline />
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Pages />
      </ThemeProvider>
    </ApolloProvider>
  </>
);

export default App;
