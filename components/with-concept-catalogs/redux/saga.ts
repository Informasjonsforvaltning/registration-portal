import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';


import { CONCEPT_CATALOGS_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { ConceptCatalog } from '../../../types';
import { getSession } from 'next-auth/react';

const { CONCEPT_CATALOG_BASE_URI } = env;

function* conceptCatalogsRequested() {
  try {
    const session = yield call(getSession)

    const authorization: string = `Bearer ${session?.accessToken}`

    const { data } = yield call(
      axios.get,
      `${CONCEPT_CATALOG_BASE_URI}/begrepssamlinger`,
      {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (Array.isArray(data)) {
      yield put(actions.conceptCatalogsSucceeded(data as ConceptCatalog[]));
    } else {
      yield put(
        actions.conceptCatalogsFailed(
          'An error occurred during an attempt to get concept collections.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.conceptCatalogsFailed(error));
  }
}

export default function* saga() {
  yield all([takeLatest(CONCEPT_CATALOGS_REQUESTED, conceptCatalogsRequested)]);
}
