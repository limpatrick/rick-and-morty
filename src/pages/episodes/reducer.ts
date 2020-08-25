import { pick } from 'ramda';
import { Action, CHANGE_PAGE, SEARCH, SEARCH_START, SEARCH_SUCCESS, State } from './types';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case SEARCH:
      return { ...state, page: 1, ...action.payload };
    case SEARCH_START:
      return { ...state, loading: true };
    case SEARCH_SUCCESS:
      return {
        ...state,
        count: action.payload.episodes.info.pages,
        episodes: action.payload.episodes.results.map(pick(['id', 'air_date', 'name', 'episode'])),
        loading: false,
      };
    case CHANGE_PAGE:
      return { ...state, page: action.payload };
    default:
      throw new Error(`Unhandled action`);
  }
};
