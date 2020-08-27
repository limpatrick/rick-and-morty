import { gql } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';
import { useGetEpisodeQuery } from '../generated/graphql';

type Props = RouteComponentProps & { id?: string };

const Episode = ({ id }: Props) => {
  const { data, loading, error } = useGetEpisodeQuery({ variables: { id: id as string } });

  if (loading) {
    return (
      <GridContainer container item justify="center" alignItems="center">
        <Loading />
      </GridContainer>
    );
  }
  if (error || !data) {
    return (
      <GridContainer container item justify="center" alignItems="center">
        <Typography variant="h2">Episode not found :(</Typography>
      </GridContainer>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2" color="textSecondary">
          {data.episode.episode}
        </Typography>
        <Typography variant="h2" display="inline">
          {data.episode.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {data.episode.air_date}
        </Typography>
      </Grid>
      <FeaturedCharactersTitleGrid item xs={12}>
        <Typography variant="h4" paragraph>
          Featured characters
        </Typography>
      </FeaturedCharactersTitleGrid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          {data.episode.characters.map(({ id, name, image }) => (
            <Grid key={id} item>
              <Link to={`/character/${id}`}>
                <Tooltip title={name}>
                  <LargeAvatar alt={name} src={image} />
                </Tooltip>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Episode;

export const query = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
    }
  }
`;

const GridContainer = styled(Grid)`
  height: calc(100vh - 88px);
`;

const FeaturedCharactersTitleGrid = styled(Grid)`
  padding-top: 64px;
`;

const LargeAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
`;
