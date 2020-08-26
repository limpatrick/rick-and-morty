import { pick } from 'ramda';
import { Action, SEARCH_ERROR, SEARCH_START, SEARCH_SUCCESS, SET_FILTERS, State } from './types';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        page: action.payload.page ?? 1,
        name: action.payload.name ?? '',
        episode: action.payload.episode ?? '',
      };
    case SEARCH_START:
      return { ...state, count: 0, loading: true };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        episodes: action.payload.episodes.results.map(pick(['id', 'air_date', 'name', 'episode'])),
        count: action.payload.episodes.info.pages,
      };
    case SEARCH_ERROR:
      return { ...state, loading: false, episodes: [], count: 0 };
    default:
      throw new Error(`Unhandled action`);
  }
};
