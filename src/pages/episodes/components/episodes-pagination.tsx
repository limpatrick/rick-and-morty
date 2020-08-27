import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { toPath } from '../../../helpers/location';
import { useEpisodesState } from '../provider';

const EpisodesPagination = () => {
  const { count, page, name, episode, loading } = useEpisodesState();

  if (count === 0 || loading) return null;

  return (
    <StyledGrid container item justify="center" alignItems="center" spacing={2}>
      <Pagination
        page={page}
        count={count}
        color="secondary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={toPath({ page: item.page === 1 ? undefined : item.page, name, episode }, '/')}
            {...item}
          />
        )}
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
