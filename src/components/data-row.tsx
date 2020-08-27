import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

type Props = { label: string; value: string };

const DataRow = ({ label, value }: Props) => (
  <Grid container>
    <Grid item xs={3}>
      <Typography variant="subtitle2" color="primary">
        {label}
      </Typography>
    </Grid>
    <ValueGrid item>
      <Typography variant="body2">{value}</Typography>
    </ValueGrid>
  </Grid>
);

export default DataRow;

const ValueGrid = styled(Grid)`
  @media (max-width: 600px) {
    width: 200px;
  }
`;
