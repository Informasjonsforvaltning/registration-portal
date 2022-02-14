import {
  RECORD_COUNTS_REQUESTED,
  RECORD_COUNTS_SUCCEEDED,
  RECORD_COUNTS_FAILED
} from './actions-types';

import type { OrganizationRecordCount } from '../../../types';

export function recordCountsRequested() {
  return {
    type: RECORD_COUNTS_REQUESTED
  };
}

export function recordCountsSucceeded(recordCounts: OrganizationRecordCount[]) {
  return {
    type: RECORD_COUNTS_SUCCEEDED,
    payload: {
      recordCounts
    }
  };
}

export function recordCountsFailed(message: string) {
  return {
    type: RECORD_COUNTS_FAILED,
    payload: {
      message
    }
  };
}
