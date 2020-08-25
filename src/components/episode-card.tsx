import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';
import { EpisodesQuery } from '../generated/graphql';

type Props = Pick<EpisodesQuery['episodes']['results'][0], 'name' | 'episode' | 'air_date'>;

const StyledCardContent = styled(CardContent)`
  @media (min-width: 960px) {
    min-height: 125px;
  }
`;

const EpisodeCard = ({ name, episode, air_date }: Props) => {
  return (
    <Card>
      <CardActionArea>
        <StyledCardContent>
          <Typography variant="button" color="textSecondary" gutterBottom>
            {episode}
          </Typography>
          <Typography variant="body1" component="h2">
            {name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {air_date}
          </Typography>
        </StyledCardContent>
      </CardActionArea>
    </Card>
  );
};

export default EpisodeCard;
