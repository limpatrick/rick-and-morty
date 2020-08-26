import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';

const NotFound = (props: RouteComponentProps) => (
  <GridContainer container item justify="center" alignItems="center">
    <Typography variant="h2">Not found :(</Typography>
  </GridContainer>
);

export default NotFound;

const GridContainer = styled(Grid)`
  height: calc(100vh - 88px);
`;
