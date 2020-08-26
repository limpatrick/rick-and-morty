import { SearchEpisodesQuery } from '../../generated/graphql';
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SearchStartAction,
  SearchSuccessAction,
  SET_PARAMETERS,
  SetParametersAction,
} from './types';

export const setParameters = (
  page: number | undefined,
  name: string | undefined,
  episode: string | undefined
): SetParametersAction => ({ type: SET_PARAMETERS, payload: { page, name, episode } });

export const searchEpisodeStart = (): SearchStartAction => ({ type: SEARCH_START });
export const searchSuccess = (data: SearchEpisodesQuery): SearchSuccessAction => ({
  type: SEARCH_SUCCESS,
  payload: data,
});
