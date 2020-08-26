import { Router } from '@reach/router';
import React from 'react';
import AppBar from '../components/app-bar';
import PageContainer from '../components/page-container';
import Episode from './episode';
import Episodes from './episodes';
import NotFound from './not-found';

const Pages = () => (
  <>
    <AppBar />
    <PageContainer>
      <Router>
        <Episodes path="/" />
        <Episode path="episode/:id" />
        <NotFound default />
      </Router>
    </PageContainer>
  </>
);

export default Pages;
