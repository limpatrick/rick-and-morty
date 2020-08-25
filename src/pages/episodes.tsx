import { gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link, RouteComponentProps } from '@reach/router';
import { parse } from 'query-string';
import { is } from 'ramda';
import React from 'react';
import styled from 'styled-components';
import EpisodeCard from '../components/episode-card';
import { useEpisodesQuery } from '../generated/graphql';

const Episodes = ({ location }: RouteComponentProps) => {
  const params = parse(location?.search ?? '');
  const page = is(String, params.page) ? parseInt(params.page as string) : 1;
  const { loading, error, data } = useEpisodesQuery({ variables: { page } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        {data?.episodes.results.map((episode) => (
          <Grid key={episode.id} item xs={12} sm={6} md={3}>
            <EpisodeCard {...episode} />
          </Grid>
        ))}
      </Grid>
      <StyledPaginationGrid container item justify="center" alignItems="center" spacing={2}>
        <Pagination
          page={page}
          count={data?.episodes.info.pages}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
            />
          )}
          showFirstButton
          showLastButton
        />
      </StyledPaginationGrid>
    </>
  );
};

export default Episodes;

export const query = gql`
  query Episodes($page: Int!) {
    episodes(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const StyledPaginationGrid = styled(Grid)`
  padding-top: 32px;
  padding-bottom: 32px;
`;
