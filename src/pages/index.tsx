import { Router } from '@reach/router';
import React from 'react';
import AppBar from '../components/app-bar';
import PageContainer from '../components/page-container';
import Episodes from './episodes';

const Pages = () => (
  <>
    <AppBar />
    <PageContainer>
      <Router>
        <Episodes path="/" />
      </Router>
    </PageContainer>
  </>
);

export default Pages;
