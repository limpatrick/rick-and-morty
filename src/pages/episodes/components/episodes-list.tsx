import Grid from '@material-ui/core/Grid';
import React from 'react';
import styled from 'styled-components';
import DisplayMessage from '../../../components/display-message';
import Loading from '../../../components/loading';
import { useEpisodesState } from '../provider';
import EpisodeCard from './episode-card';

const EpisodesList = () => {
  const { episodes, loading } = useEpisodesState();

  if (loading) {
    return (
      <GridContainer container item justify="center" alignItems="center">
        <Loading />
      </GridContainer>
    );
  }

  if (episodes.length === 0) return <DisplayMessage>No results :(</DisplayMessage>;

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      {episodes.map((episode) => (
        <Grid key={episode.id} item xs={12} sm={6} md={3}>
          <EpisodeCard {...episode} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EpisodesList;

const GridContainer = styled(Grid)`
  height: calc(100vh - 162px);
`;
