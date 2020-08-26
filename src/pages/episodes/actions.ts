import { ApolloError } from '@apollo/client';
import { SearchEpisodesQuery } from '../../generated/graphql';
import {
  SEARCH_ERROR,
  SEARCH_START,
  SEARCH_SUCCESS,
  SearchErrorAction,
  SearchStartAction,
  SearchSuccessAction,
  SET_FILTERS,
  SetFiltersAction,
} from './types';

export const setFilters = (
  page: number | undefined,
  name: string | undefined,
  episode: string | undefined
): SetFiltersAction => ({ type: SET_FILTERS, payload: { page, name, episode } });

export const searchStart = (): SearchStartAction => ({ type: SEARCH_START });

export const searchSuccess = (data: SearchEpisodesQuery): SearchSuccessAction => ({
  type: SEARCH_SUCCESS,
  payload: data,
});

export const searchError = (error: ApolloError): SearchErrorAction => ({
  type: SEARCH_ERROR,
  payload: error,
  error: true,
});
