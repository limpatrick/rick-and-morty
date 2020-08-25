import { SearchEpisodesQuery } from '../../generated/graphql';

export const SEARCH = 'SEARCH';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export type SearchAction = { type: typeof SEARCH; payload: { name: string; episode: string } };
export type SearchStartAction = { type: typeof SEARCH_START };
export type SearchSuccessAction = {
  type: typeof SEARCH_SUCCESS;
  payload: SearchEpisodesQuery;
};
export type ChangePageAction = { type: typeof CHANGE_PAGE; payload: number };

export type Action = SearchAction | SearchStartAction | SearchSuccessAction | ChangePageAction;
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
