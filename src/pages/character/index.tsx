import { gql } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import Loading from '../../components/loading';
import { useGetCharacterQuery } from '../../generated/graphql';
import { format } from '../../helpers/date';
import CharacterRow from './components/character-row';

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
  if (error || !data) {
    return (
      <GridContainer container item justify="center" alignItems="center">
        <Typography variant="h2">Character not found :(</Typography>
      </GridContainer>
    );
  }

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" paragraph>
          Information
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <CharacterRow label="Name" value={data.character.name} />
        <CharacterRow label="Status" value={data.character.status} />
        <CharacterRow label="Species" value={data.character.species} />
        <CharacterRow label="Type" value={data.character.type} />
        <CharacterRow label="Gender" value={data.character.gender} />
        <CharacterRow label="Origin" value={data.character.origin.name} />
        <CharacterRow label="Location" value={data.character.location.name} />
        <CharacterRow label="Created" value={format(data.character.created, 'LLL')} />
      </Grid>
      <Grid container item xs={6} justify="center">
        <LargeAvatar alt={data.character.name} src={data.character.image} />
      </Grid>
      <EpisodeGridContainer container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" paragraph>
            Episode list
          </Typography>
        </Grid>
        {data.character.episode.map(({ id, episode }) => (
          <Grid key={id} item>
            <MuiLink component={Link} to={`/episode/${id}`}>
              {episode}
            </MuiLink>
          </Grid>
        ))}
      </EpisodeGridContainer>
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
`;
