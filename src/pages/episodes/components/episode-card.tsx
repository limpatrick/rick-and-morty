import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { SearchEpisodesQuery } from '../../../generated/graphql';

type Props = Pick<
  SearchEpisodesQuery['episodes']['results'][0],
  'id' | 'name' | 'episode' | 'air_date' | 'characters'
>;

const EpisodeCard = ({ id, name, episode, air_date, characters }: Props) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/episode/${id}`}>
        <StyledCardContent>
          <Typography variant="button" color="textSecondary" gutterBottom>
            {episode}
          </Typography>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {air_date}
          </Typography>
          <AvatarGroup max={5}>
            {characters.map(({ id, name, image }) => (
              <Avatar key={id} alt={name} src={image} />
            ))}
          </AvatarGroup>
        </StyledCardContent>
      </CardActionArea>
    </Card>
  );
};

export default EpisodeCard;

const StyledCardContent = styled(CardContent)`
  @media (min-width: 960px) {
    min-height: 165px;
  }
`;
