import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import React from 'react';
import styled from 'styled-components';
import { useEpisodes } from '../provider';

const EpisodesPagination = () => {
  const [{ count, page }, { changePage }] = useEpisodes();

  return (
    <StyledGrid container item justify="center" alignItems="center" spacing={2}>
      <Pagination
        page={page}
        count={count}
        color="primary"
        renderItem={(item) => <PaginationItem {...item} onClick={() => changePage(item.page)} />}
        showFirstButton
        showLastButton
      />
    </StyledGrid>
  );
};

export default EpisodesPagination;

const StyledGrid = styled(Grid)`
  padding-top: 32px;
  padding-bottom: 32px;
`;
