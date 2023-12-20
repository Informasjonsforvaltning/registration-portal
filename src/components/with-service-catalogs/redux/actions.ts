import {
  SERVICE_CATALOGS_REQUESTED,
  SERVICE_CATALOGS_SUCCEEDED,
  SERVICE_CATALOGS_FAILED
} from './actions-types';

import type { ServiceCatalog } from '../../../types';

export function serviceCatalogsRequested() {
  return {
    type: SERVICE_CATALOGS_REQUESTED
  };
}

export function serviceCatalogsSucceeded(serviceCatalogs: ServiceCatalog[]) {
  return {
    type: SERVICE_CATALOGS_SUCCEEDED,
    payload: {
      serviceCatalogs
    }
  };
}

export function serviceCatalogsFailed(message: string) {
  return {
    type: SERVICE_CATALOGS_FAILED,
    payload: {
      message
    }
  };
}
