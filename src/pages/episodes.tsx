import { gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import EpisodeCard from '../components/episode-card';
import { useEpisodesQuery } from '../generated/graphql';

export const query = gql`
  query Episodes {
    episodes {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const Episodes = (props: RouteComponentProps) => {
  const { loading, error, data } = useEpisodesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      {data?.episodes.results.map((episode) => (
        <Grid key={episode.id} item xs={12} sm={6} md={3}>
          <EpisodeCard {...episode} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Episodes;
