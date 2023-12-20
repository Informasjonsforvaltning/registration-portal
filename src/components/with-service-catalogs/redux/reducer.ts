import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  SERVICE_CATALOGS_REQUESTED,
  SERVICE_CATALOGS_SUCCEEDED,
  SERVICE_CATALOGS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  serviceCatalogs: [],
  isLoadingServiceCatalogs: false
});

export default function reducer(state: any, action: Actions<typeof actions>) {
  state = state ?? initialState;
  switch (action.type) {
    case SERVICE_CATALOGS_REQUESTED:
      return state
        .set('serviceCatalogs', fromJS([]))
        .set('isLoadingServiceCatalogs', true);
    case SERVICE_CATALOGS_SUCCEEDED:
      return state
        .set('serviceCatalogs', fromJS(action.payload.serviceCatalogs))
        .set('isLoadingServiceCatalogs', false);
    case SERVICE_CATALOGS_FAILED:
      return state.set('isLoadingServiceCatalogs', false);
    default:
      return state;
  }
}
