import { gql } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { useEpisodesQuery } from '../generated/graphql';

export const query = gql`
  query Episodes {
    episodes {
      info {
        count
      }
      results {
        name
        episode
      }
    }
  }
`;

const Episodes = (props: RouteComponentProps) => {
  const { loading, error, data } = useEpisodesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return <div>episodes</div>;
};

export default Episodes;
