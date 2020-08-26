import { gql } from '@apollo/client';
import { useLocation, useNavigate } from '@reach/router';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useSearchEpisodesLazyQuery } from '../../generated/graphql';
import { getEpisode, getName, getPage, getParam, toPath } from '../../helpers/location';
import { searchError, searchStart, searchSuccess, setFilters } from './actions';
import reducer from './reducer';
import { State } from './types';

type Actions = {
  search: (name: string, episode: string) => void;
};
type Props = { children: React.ReactNode };

const EpisodesStateContext = createContext<State | undefined>(undefined);
const EpisodesActionsContext = createContext<Actions | undefined>(undefined);

const getInitialState = (location: ReturnType<typeof useLocation>): State => ({
  page: getPage(location) ?? 1,
  name: getName(location) ?? '',
  episode: getEpisode(location) ?? '',
  count: 0,
  episodes: [],
  loading: false,
});

const EpisodesProvider = ({ children }: Props) => {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, getInitialState(location));
  const [search, { loading, data, error }] = useSearchEpisodesLazyQuery();
  const navigate = useNavigate();

  const { page, name, episode } = state;
  const actions: Actions = {
    search: (newName, newEpisode) => {
      if (name !== newName || episode !== newEpisode || page > 1) {
        dispatch(setFilters(1, newName, newEpisode));
        navigate(
          toPath(
            {
              page: undefined,
              name: newName,
              episode: newEpisode,
            },
            '/'
          )
        );
      }
    },
  };

  // update filters when location changed
  useEffect(() => {
    const currentPage = getParam('page', location);
    const currentName = getParam('name', location);
    const currentEpisode = getParam('episode', location);
    const pageParam = getPage(location);
    const nameParam = getName(location);
    const episodeParam = getEpisode(location);

    dispatch(setFilters(pageParam, nameParam, episodeParam));

    if (
      currentPage !== pageParam?.toString() ||
      currentName !== nameParam ||
      currentEpisode !== episodeParam
    ) {
      navigate(
        toPath(
          {
            page: pageParam,
            name: nameParam,
            episode: episodeParam,
          },
          '/'
        )
      );
    }
  }, [location, navigate]);

  // search
  useEffect(() => {
    dispatch(searchStart());
    search({ variables: { page, name, episode } });
  }, [episode, name, page, search]);

  // receive data
  useEffect(() => {
    if (!loading && data) dispatch(searchSuccess(data));
  }, [loading, data]);

  // receive error
  useEffect(() => {
    if (error) {
      console.error('GraphQL SearchEpisodes error', error);
      dispatch(searchError(error));
    }
  }, [error]);

  return (
    <EpisodesStateContext.Provider value={state}>
      <EpisodesActionsContext.Provider value={actions}>{children}</EpisodesActionsContext.Provider>
    </EpisodesStateContext.Provider>
  );
};

const useEpisodesState = () => {
  const context = useContext(EpisodesStateContext);

  if (context === undefined)
    throw new Error('useEpisodesState must be used within EpisodesProvider');

  return context;
};

const useEpisodesActions = () => {
  const context = useContext(EpisodesActionsContext);

  if (context === undefined)
    throw new Error('useEpisodesActions must be used within EpisodesProvider');

  return context;
};

const useEpisodes = (): [State, Actions] => [useEpisodesState(), useEpisodesActions()];

export { EpisodesProvider, useEpisodesActions, useEpisodes, useEpisodesState };

export const query = gql`
  query SearchEpisodes($page: Int!, $name: String, $episode: String) {
    episodes(page: $page, filter: { name: $name, episode: $episode }) {
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
