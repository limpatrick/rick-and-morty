import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';
import { useEpisodesState } from '../provider';
import EpisodeCard from './episode-card';

const EpisodesList = () => {
  const { episodes, loading } = useEpisodesState();

  if (loading) {
    return (
      <Container container item alignItems="center">
        <LinearProgress />
      </Container>
    );
  }

  if (episodes.length === 0)
    return (
      <Container container item justify="center" alignItems="center">
        <Typography>No results :(</Typography>
      </Container>
    );

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

const Container = styled(Grid)`
  min-height: 150px;

  & > div {
    width: 100%;
  }
`;
