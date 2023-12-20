import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth/auth-service';

import { SERVICE_CATALOGS_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { ServiceCatalog } from '../../../types';

const { SERVICE_CATALOG_BASE_URI } = env;

function* serviceCatalogsRequested() {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data } = yield call(
      axios.get,
      `${SERVICE_CATALOG_BASE_URI}/internal/catalogs/count`,
      {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );
    if (Array.isArray(data)) {
      yield put(actions.serviceCatalogsSucceeded(data as ServiceCatalog[]));
    } else {
      yield put(
        actions.serviceCatalogsFailed(
          'An error occurred during an attempt to get service catalogs.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.serviceCatalogsFailed(error));
  }
}

export default function* saga() {
  yield all([takeLatest(SERVICE_CATALOGS_REQUESTED, serviceCatalogsRequested)]);
}
