import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth';

import { DATA_SERVICE_CATALOGS_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { DataServiceCatalog } from '../../../types';

const { DATASERVICE_CATALOG_BASE_URI } = env;

function* dataServiceCatalogsRequested() {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data } = yield call(
      axios.get,
      `${DATASERVICE_CATALOG_BASE_URI}/catalogs`,
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
        actions.dataServiceCatalogsSucceeded(data as DataServiceCatalog[])
      );
    } else {
      yield put(
        actions.dataServiceCatalogsFailed(
          'An error occurred during an attempt to get data service catalogs.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.dataServiceCatalogsFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(DATA_SERVICE_CATALOGS_REQUESTED, dataServiceCatalogsRequested)
  ]);
}
