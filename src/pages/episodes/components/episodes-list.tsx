import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useEpisodesState } from '../provider';
import EpisodeCard from './episode-card';

const EpisodesList = () => {
  const { episodes } = useEpisodesState();

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
