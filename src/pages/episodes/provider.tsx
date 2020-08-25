import { gql } from '@apollo/client';
import { useLocation, useNavigate } from '@reach/router';
import { equals } from 'ramda';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useSearchEpisodesLazyQuery } from '../../generated/graphql';
import { getCurrentPath, getEpisode, getName, getPage, toPath } from '../../helpers/location';
import { changePage, searchEpisode, searchEpisodeStart, searchEpisodeSuccess } from './actions';
import reducer from './reducer';
import { State } from './types';

type Actions = {
  search: (name: string, episode: string) => void;
  changePage: (page: number) => void;
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
  const [search, { loading, data }] = useSearchEpisodesLazyQuery();
  const navigate = useNavigate();

  const { page, name, episode } = state;
  const actions: Actions = {
    search: (newName, newEpisode) => dispatch(searchEpisode(newName, newEpisode)),
    changePage: (newPage) => dispatch(changePage(newPage)),
  };

  useEffect(() => {
    dispatch(searchEpisodeStart());
    search({ variables: { page, name, episode } });
  }, [episode, name, page, search]);

  useEffect(() => {
    if (!loading && data) dispatch(searchEpisodeSuccess(data));
  }, [data, loading]);

  useEffect(() => {
    const newPath = toPath(
      {
        page,
        name: name !== '' ? name : undefined,
        episode: episode !== '' ? episode : undefined,
      },
      '/'
    );
    const currentPath = getCurrentPath(location);

    if (!equals(currentPath, newPath)) navigate(newPath);
  }, [episode, location, name, navigate, page]);

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
