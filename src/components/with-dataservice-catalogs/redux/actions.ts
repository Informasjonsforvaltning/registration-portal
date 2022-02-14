import {
  DATA_SERVICE_CATALOGS_REQUESTED,
  DATA_SERVICE_CATALOGS_SUCCEEDED,
  DATA_SERVICE_CATALOGS_FAILED
} from './actions-types';

import type { DataServiceCatalog } from '../../../types';

export function dataServiceCatalogsRequested() {
  return {
    type: DATA_SERVICE_CATALOGS_REQUESTED
  };
}

export function dataServiceCatalogsSucceeded(
  dataServiceCatalogs: DataServiceCatalog[]
) {
  return {
    type: DATA_SERVICE_CATALOGS_SUCCEEDED,
    payload: {
      dataServiceCatalogs
    }
  };
}

export function dataServiceCatalogsFailed(message: string) {
  return {
    type: DATA_SERVICE_CATALOGS_FAILED,
    payload: {
      message
    }
  };
}
