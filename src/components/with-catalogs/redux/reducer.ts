import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  LIST_CATALOGS_REQUESTED,
  LIST_CATALOGS_SUCCEEDED,
  LIST_CATALOGS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  catalogs: [],
  isLoadingCatalogs: false
});

export const reducer = (state: any, action: Actions<typeof actions>) => {
  state = state ?? initialState;
  switch (action.type) {
    case LIST_CATALOGS_REQUESTED:
      return state.set('catalogs', fromJS([])).set('isLoadingCatalogs', true);
    case LIST_CATALOGS_SUCCEEDED:
      return state
        .set('catalogs', fromJS(action.payload.catalogs))
        .set('isLoadingCatalogs', false);
    case LIST_CATALOGS_FAILED:
      return state.set('isLoadingCatalogs', false);
    default:
      return state;
  }
};

export default reducer;
