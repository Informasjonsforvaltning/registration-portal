import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import { RECORD_COUNTS_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { OrganizationRecordCount } from '../../../types';
import { getSession } from 'next-auth/react';

const { RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI } = env;

function* recordCountsRequested() {
  try {
    const session = yield call(getSession)

    const authorization: string = `Bearer ${session?.accessToken}`

    const { data } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI}/api/organizations`,
      {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (Array.isArray(data)) {
      yield put(
        actions.recordCountsSucceeded(data as OrganizationRecordCount[])
      );
    } else {
      yield put(
        actions.recordCountsFailed(
          'An error occurred during an attempt to get organization record counts.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.recordCountsFailed(error));
  }
}

export default function* saga() {
  yield all([takeLatest(RECORD_COUNTS_REQUESTED, recordCountsRequested)]);
}
