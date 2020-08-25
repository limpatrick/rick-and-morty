import { RouteComponentProps } from '@reach/router';
import React from 'react';
import EpisodesList from './components/episodes-list';
import EpisodesPagination from './components/episodes-pagination';
import EpisodesSearch from './components/episodes-search';
import { EpisodesProvider } from './provider';

const Episodes = (props: RouteComponentProps) => (
  <EpisodesProvider>
    <EpisodesSearch />
    <EpisodesList />
    <EpisodesPagination />
  </EpisodesProvider>
);

export default Episodes;
