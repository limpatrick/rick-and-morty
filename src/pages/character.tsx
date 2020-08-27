import { gql } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import DataRow from '../components/data-row';
import DisplayMessage from '../components/display-message';
import Loading from '../components/loading';
import { SorterProvider, SorterSelect } from '../components/sorter';
import { useGetCharacterQuery } from '../generated/graphql';
import { format } from '../helpers/date';

type Props = RouteComponentProps & { id?: string };

const Character = ({ id }: Props) => {
  const { data, loading, error } = useGetCharacterQuery({ variables: { id: id as string } });

  if (loading) {
    return (
      <GridContainer container item justify="center" alignItems="center">
        <Loading />
      </GridContainer>
    );
  }
  if (error || !data) return <DisplayMessage>Character not found :(</DisplayMessage>;

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" paragraph>
          Information
        </Typography>
      </Grid>
      <Grid item xs={8} sm={6}>
        <DataRow label="Name" value={data.character.name} />
        <DataRow label="Status" value={data.character.status} />
        <DataRow label="Species" value={data.character.species} />
        <DataRow label="Type" value={data.character.type} />
        <DataRow label="Gender" value={data.character.gender} />
        <DataRow label="Origin" value={data.character.origin.name} />
        <DataRow label="Location" value={data.character.location.name} />
        <DataRow label="Created" value={format(data.character.created, 'LLL')} />
      </Grid>
      <Grid container item xs={4} sm={6} justify="center">
        <LargeAvatar alt={data.character.name} src={data.character.image} />
      </Grid>
      <SorterProvider data={data.character.episode} removeFields={['__typename', 'id']}>
        {({ data: episodes }) => (
          <>
            <EpisodeGridContainer container spacing={2}>
              <Grid container item alignItems="flex-end">
                <Typography variant="h4">Episode list</Typography>
              </Grid>
              <Grid container item xs justify="flex-end">
                <SorterSelect />
              </Grid>
            </EpisodeGridContainer>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                {episodes.map(({ id, episode }) => (
                  <Grid key={id} item>
                    <MuiLink component={Link} to={`/episode/${id}`}>
                      {episode}
                    </MuiLink>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </SorterProvider>
    </Grid>
  );
};

export default Character;

export const query = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        episode
        created
      }
      created
    }
  }
`;

const GridContainer = styled(Grid)`
  height: calc(100vh - 88px);
`;

const LargeAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
`;

const EpisodeGridContainer = styled(Grid)`
  padding-top: 40px;
  padding-bottom: 40px;

  & > * {
    width: 310px;
    height: 50px;
  }
`;
