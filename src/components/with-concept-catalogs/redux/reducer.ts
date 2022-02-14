import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  CONCEPT_CATALOGS_REQUESTED,
  CONCEPT_CATALOGS_SUCCEEDED,
  CONCEPT_CATALOGS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  conceptCatalogs: [],
  isLoadingConceptCatalogs: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case CONCEPT_CATALOGS_REQUESTED:
      return state
        .set('conceptCatalogs', fromJS([]))
        .set('isLoadingConceptCatalogs', true);
    case CONCEPT_CATALOGS_SUCCEEDED:
      return state
        .set('conceptCatalogs', fromJS(action.payload.conceptCatalogs))
        .set('isLoadingConceptCatalogs', false);
    case CONCEPT_CATALOGS_FAILED:
      return state.set('isLoadingConceptCatalogs', false);
    default:
      return state;
  }
}
