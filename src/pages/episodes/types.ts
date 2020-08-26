import { SearchEpisodesQuery } from '../../generated/graphql';

export const SET_PARAMETERS = 'SET_PARAMETERS';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export type SetParametersAction = {
  type: typeof SET_PARAMETERS;
  payload: { page: number | undefined; name: string | undefined; episode: string | undefined };
};
export type SearchStartAction = { type: typeof SEARCH_START };
export type SearchSuccessAction = {
  type: typeof SEARCH_SUCCESS;
  payload: SearchEpisodesQuery;
};

export type Action = SetParametersAction | SearchStartAction | SearchSuccessAction;
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
