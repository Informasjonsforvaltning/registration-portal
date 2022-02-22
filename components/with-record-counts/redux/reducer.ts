import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  RECORD_COUNTS_REQUESTED,
  RECORD_COUNTS_SUCCEEDED,
  RECORD_COUNTS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  recordCounts: [],
  isLoadingRecordCounts: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case RECORD_COUNTS_REQUESTED:
      return state
        .set('recordCounts', fromJS([]))
        .set('isLoadingRecordCounts', true);
    case RECORD_COUNTS_SUCCEEDED:
      return state
        .set('recordCounts', fromJS(action.payload.recordCounts))
        .set('isLoadingRecordCounts', false);
    case RECORD_COUNTS_FAILED:
      return state.set('isLoadingRecordCounts', false);
    default:
      return state;
  }
}
