import { Router } from '@reach/router';
import React from 'react';
import AppBar from '../components/app-bar';
import PageContainer from '../components/page-container';
import Character from './character';
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
        <Character path="character/:id" />
        <NotFound default />
      </Router>
    </PageContainer>
  </>
);

export default Pages;
