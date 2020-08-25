import Container from '@material-ui/core/Container';
import { Router } from '@reach/router';
import React from 'react';
import Episodes from './episodes';

const Pages = () => (
  <Container maxWidth="md">
    <Router>
      <Episodes path="/" />
    </Router>
  </Container>
);

export default Pages;
