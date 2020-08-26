import { ApolloError } from '@apollo/client';
import { SearchEpisodesQuery } from '../../generated/graphql';

export const SET_FILTERS = 'SET_FILTERS';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export type SetFiltersAction = {
  type: typeof SET_FILTERS;
  payload: { page: number | undefined; name: string | undefined; episode: string | undefined };
};
export type SearchStartAction = { type: typeof SEARCH_START };
export type SearchSuccessAction = {
  type: typeof SEARCH_SUCCESS;
  payload: SearchEpisodesQuery;
};
export type SearchErrorAction = { type: typeof SEARCH_ERROR; payload: ApolloError; error: true };

export type Action = SetFiltersAction | SearchStartAction | SearchSuccessAction | SearchErrorAction;
export type State = {
  page: number;
  name: string;
  episode: string;
  count: number;
  loading: boolean;
  episodes: Pick<
    SearchEpisodesQuery['episodes']['results'][0],
    'id' | 'air_date' | 'episode' | 'name'
  >[];
};
