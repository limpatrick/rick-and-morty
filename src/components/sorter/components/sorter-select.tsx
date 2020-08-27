import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DescIcon from '@material-ui/icons/ArrowDownwardRounded';
import AscIcon from '@material-ui/icons/ArrowUpwardRounded';
import React from 'react';
import styled from 'styled-components';
import { useSorter } from '../provider';

const SorterSelect = () => {
  const [{ fields, field, labelId, order }, { setField, toggleOrder }] = useSorter();

  return (
    <GridContainer container alignItems="flex-end">
      <Grid item>
        <StyledFormControl size="small">
          <InputLabel id={labelId}>Sort by</InputLabel>
          <Select
            autoWidth
            labelId={labelId}
            value={field ?? ''}
            onChange={({ target: { value } }) => setField(value as string)}
          >
            {fields.map((field, i) => (
              <MenuItem key={i} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item>
        <IconButton aria-label={order} size="small" onClick={toggleOrder}>
          {order === 'asc' ? <AscIcon fontSize="small" /> : <DescIcon fontSize="small" />}
        </IconButton>
      </Grid>
    </GridContainer>
  );
};

export default SorterSelect;

const StyledFormControl = styled(FormControl)`
  min-width: 75px;
`;

const GridContainer = styled(Grid)`
  width: auto;
`;
