import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';
import rickAndMorty from '../assets/images/rick-and-morty.png';

type Props = { children: string };

const DisplayMessage = ({ children }: Props) => (
  <Grid container justify="center" alignItems="center" spacing={6}>
    <Grid item>
      <Img src={rickAndMorty} alt="Rick and Morty" />
    </Grid>
    <Grid item>
      <Typography variant="h2">{children}</Typography>
    </Grid>
  </Grid>
);

export default DisplayMessage;

const Img = styled.img`
  width: 100%;
  height: auto;
`;
