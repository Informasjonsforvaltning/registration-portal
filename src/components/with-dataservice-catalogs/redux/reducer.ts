import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  DATA_SERVICE_CATALOGS_REQUESTED,
  DATA_SERVICE_CATALOGS_SUCCEEDED,
  DATA_SERVICE_CATALOGS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  dataServiceCatalogs: [],
  isLoadingDataServiceCatalogs: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case DATA_SERVICE_CATALOGS_REQUESTED:
      return state
        .set('dataServiceCatalogs', fromJS([]))
        .set('isLoadingDataServiceCatalogs', true);
    case DATA_SERVICE_CATALOGS_SUCCEEDED:
      return state
        .set('dataServiceCatalogs', fromJS(action.payload.dataServiceCatalogs))
        .set('isLoadingDataServiceCatalogs', false);
    case DATA_SERVICE_CATALOGS_FAILED:
      return state.set('isLoadingDataServiceCatalogs', false);
    default:
      return state;
  }
}
