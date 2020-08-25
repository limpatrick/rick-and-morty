import { SearchEpisodesQuery } from '../../generated/graphql';
import {
  CHANGE_PAGE,
  ChangePageAction,
  SEARCH,
  SEARCH_START,
  SEARCH_SUCCESS,
  SearchAction,
  SearchStartAction,
  SearchSuccessAction,
} from './types';

export const searchEpisode = (name: string, episode: string): SearchAction => ({
  type: SEARCH,
  payload: { name, episode },
});

export const searchEpisodeStart = (): SearchStartAction => ({ type: SEARCH_START });

export const searchEpisodeSuccess = (data: SearchEpisodesQuery): SearchSuccessAction => ({
  type: SEARCH_SUCCESS,
  payload: data,
});

export const changePage = (page: number): ChangePageAction => ({
  type: CHANGE_PAGE,
  payload: page,
});
