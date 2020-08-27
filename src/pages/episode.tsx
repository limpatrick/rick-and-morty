import { gql } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import DataRow from '../components/data-row';
import Loading from '../components/loading';
import { useGetEpisodeQuery } from '../generated/graphql';
import { format } from '../helpers/date';

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
        <Typography variant="h4" paragraph>
          Information
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DataRow label="Episode" value={data.episode.episode} />
        <DataRow label="Name" value={data.episode.name} />
        <DataRow label="On air" value={data.episode.air_date} />
        <DataRow label="Created" value={format(data.episode.created, 'LLL')} />
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
      created
    }
  }
`;

const GridContainer = styled(Grid)`
  height: calc(100vh - 88px);
`;

const FeaturedCharactersTitleGrid = styled(Grid)`
  padding-top: 40px;
`;

const LargeAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
`;
